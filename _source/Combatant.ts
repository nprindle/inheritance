/// <reference path="Tool.ts" />
/// <reference path="AbstractStatus.ts" />
/// <reference path="Trait.ts" />

abstract class Combatant {
    name: string;
    health: number;
    maxHealth: number;
    energy: number;
    maxEnergy: number;
    tools: Tool[];
    traits: [Trait, number][];
    statuses: AbstractStatus[];
    deathFunc: Function;
    afterToolFunc: Function; //hacky, to make sure tools are done being used before fights end
    opponent?: Combatant;
    imageSrc?: string;
    specialDamageFunction: (x: number) => any;

    constructor(name: string, health: number, energy: number, tools: Tool[], traits: Trait[], image?: string) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.energy = energy;
        this.maxEnergy = energy;
        this.tools = tools;
        this.traits = [];
        traits.forEach(trait => this.addTrait(trait));
        this.deathFunc = function() {};
        this.afterToolFunc = function() {};
        this.statuses = [];
        this.imageSrc = image;
        this.specialDamageFunction = x => {};
    };

    abstract clone(): Combatant;

    startFight(other: Combatant): void {
        this.opponent = other;
        this.statuses = [];
        this.traits.forEach(trait => {
            for (let i = 0; i < trait[1]; i++) {
                trait[0].startFight(this);
            }
        });
        this.tools.forEach(tool => tool.startFight());
        this.refresh();
    }

    endFight(): void {
        this.statuses = [];
    }

    startTurn(): void {
        this.refresh();
        this.statusCallback(StatusCallbacks.START_TURN);
    }

    endTurn(): void {
        this.statusCallback(StatusCallbacks.END_TURN);
    }

    status(): string {
        return `${this.name}: ${this.health} / ${this.maxHealth}`;
    };

    wound(damage: number): void {
        this.directDamage(this.statusFold(StatusFolds.DAMAGE_TAKEN, damage));
    };

    //This bypasses status folding.
    directDamage(damage: number): void {
        if (damage === 0) {
            return;
        }
        if (damage > this.health) {
            damage = this.health;
        }
        this.health -= damage;
        this.statusCallback(StatusCallbacks.TAKE_DAMAGE);
        this.specialDamageFunction(damage);
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    heal(amount: number): void {
        this.directHeal(this.statusFold(StatusFolds.AMOUNT_HEALED, amount));
    }

    //This bypasses status folding.
    directHeal(amount: number): void {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    refresh(): void {
        this.gainEnergy(this.maxEnergy - this.energy);
        for (let tool of this.tools) {
            tool.refresh();
        }
    }

    canAfford(cost: Cost): boolean {
        return this.health > cost.healthCost && this.energy >= cost.energyCost
            && this.getBatteryAmount() >= cost.batteryCost;
    }


    //not great, but my weird dependency decisions necessitate this
    getBatteryAmount(): number {
        return this.statuses.filter(status => status.getName() === 'battery').reduce((acc, val) => acc + val.amount, 0);
    }

    payBatteryAmount(amount: number): void {
        let battery = this.statuses.find(s => s.getName() === 'battery');
        if (battery) {
            battery.amount -= amount;
        }
        this.statusBookkeeping();
    }

    gainEnergy(amount: number): void {
        this.energy += this.statusFold(StatusFolds.ENERGY_GAINED, amount);
    }

    loseEnergy(amount: number): void {
        this.energy = Math.max(this.energy - amount, 0);
    }

    pay(cost: Cost): void {
        this.directDamage(cost.healthCost);
        this.energy -= cost.energyCost;
        this.payBatteryAmount(cost.batteryCost);
    };

    validMoves(): number[] {
        let result: number[] = [];
        for (let i = 0; i < this.tools.length; i++) {
            if (this.tools[i].usableBy(this)) {
                result.push(i);
            }
        }
        return result;
    }

    useTool(index: number, target: Combatant): void {
        if (index < 0 || index > this.tools.length) {
            return;
        }
        const tool: Tool = this.tools[index];
        this.statusCallback(StatusCallbacks.USE_TOOL);
        tool.use(this, target);
        this.afterToolFunc();
    };

    die(): void {
        this.statusCallback(StatusCallbacks.DIE);
        if (this.health <= 0) { //this check is necessary because the callbacks might heal the combatant
            this.actuallyDie();
        }
    }

    actuallyDie(): void {
        this.health = 0; //to make sure the AI accounts for this
        this.deathFunc.call(this);
    }

    setDeathFunc(f: Function): void {
        this.deathFunc = f;
    }

    setAfterToolFunc(f: Function): void {
        this.afterToolFunc = f;
    }

    addStatus(status: AbstractStatus): void {
        for (let current of this.statuses) {
            let done = current.add(status);
            if (done) {
                return;
            }
        }
        this.statuses.push(status);
        this.statusBookkeeping();
    }

    getStatusAmount(query: AbstractStatus): number {
        const matches: AbstractStatus[] = this.statuses.filter(status => status.sameKind(query));
        return matches.reduce((acc, val) => acc + val.amount, 0);
    }

    removeStatus(remove: AbstractStatus): void {
        //call the runOut callback on all the ones that run out...
        this.statuses.filter(status => status.sameKind(remove)).forEach(status => {
            status.runsOut(this, this.opponent);
        });
        this.statuses = this.statuses.filter(status => !status.sameKind(remove));
    }

    addTrait(trait: Trait): void {
        trait.apply(this);
        for (let current of this.traits) {
            if (current[0].name === trait.name) {
                current[1] = current[1] + 1;
                return;
            }
        }
        this.traits.push([trait, 1]);
    }

    removeTrait(index: number): void {
        let traitTuple = this.traits[index];
        traitTuple[0].remove(this);
        traitTuple[1]--;
        if (traitTuple[1] <= 0) {
            this.traits.splice(index, 1);
        }
    }

    statusCallback(callback: StatusCallbacks): void {
        const callbacks: Function[] = this.statuses.map(x => <Function> x[callback].bind(x));
        callbacks.forEach(x => x(this, this.opponent));
        this.statusBookkeeping();
    }

    statusFold(fold: StatusFolds, value: number): number {
        const foldingCallbacks: Function[] = this.statuses.map(x => <Function> x[fold].bind(x));
        const result: number = foldingCallbacks.reduce((acc, x) => x(acc, this), value);
        this.statusBookkeeping();
        return result;
    }

    increaseMaxHealth(amount: number): void {
        this.maxHealth += amount;
        this.health += amount;
    }

    decreaseMaxHealth(amount: number): void {
        this.maxHealth -= amount;
        this.maxHealth = Math.max(1, this.maxHealth);
        this.health = Math.min(this.health, this.maxHealth);
    }

    increaseMaxEnergy(amount: number): void {
        this.maxEnergy += amount;
        this.energy += amount;
    }

    decreaseMaxEnergy(amount: number): void {
        this.maxEnergy -= amount;
        this.maxEnergy = Math.max(1, this.maxEnergy);
        this.energy = Math.min(this.energy, this.maxEnergy);
    }

    private statusBookkeeping(): void {
        //handle callbacks on statuses that need to be removed
        this.statuses.filter(status => !status.isValid()).forEach(x => x.runsOut(this, this.opponent));
        this.statuses = this.statuses.filter(status => status.isValid());
        this.statuses = this.statuses.sort((a, b) => a.getSortingNumber() - b.getSortingNumber());
    }

}
