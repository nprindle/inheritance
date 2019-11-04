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
    traits: Trait[];
    traitNames: [string, number][];
    statuses: AbstractStatus[];
    deathFunc: Function;
    afterToolFunc: Function; //hacky, to make sure tools are done being used before fights end
    opponent: Combatant;

    constructor(name: string, health: number, energy: number, ...others: (Tool | Trait)[]) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.energy = energy;
        this.maxEnergy = energy;
        //TODO: Ask Prindle if this is typesafe.
        this.tools = <Tool[]> others.filter(x => x instanceof Tool);
        this.traits = [];
        this.traitNames = [];
        let traits = <Trait[]> others.filter(x => x instanceof Trait);
        traits.forEach(trait => this.addTrait(trait));
        this.deathFunc = function() {};
        this.afterToolFunc = function() {};
        this.statuses = [];
    };

    abstract clone(): Combatant;

    startFight(other: Combatant): void {
        this.opponent = other;
        this.statuses = [];
        this.traits.forEach(trait => trait.startFight(this));
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
        this.health -= damage;
        this.statusCallback(StatusCallbacks.TAKE_DAMAGE);
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
        for (let i = 0; i < this.tools.length; i++) {
            this.tools[i].refresh();
        }
    }

    canAfford(cost: Cost): boolean {
        return this.health > cost.healthCost && this.energy >= cost.energyCost;
    };

    gainEnergy(amount: number): void {
        this.energy += this.statusFold(StatusFolds.ENERGY_GAINED, amount);
    }

    loseEnergy(amount: number): void {
        this.energy = Math.max(this.energy - amount, 0);
    }

    pay(cost: Cost): void {
        this.directDamage(cost.healthCost);
        this.energy -= cost.energyCost;
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
            this.deathFunc.call(this);
        }
    }

    setDeathFunc(f: Function): void {
        this.deathFunc = f;
    }

    setAfterToolFunc(f: Function): void {
        this.afterToolFunc = f;
    }

    addStatus(status: AbstractStatus): void {
        for (let i = 0; i < this.statuses.length; i++) {
            let done = this.statuses[i].add(status);
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
        this.statuses = this.statuses.filter(status => !status.sameKind(remove));
    }

    addTrait(trait: Trait): void {
        this.traits.push(trait);
        let name = trait.name;
        for (let i = 0; i < this.traitNames.length; i++) {
            let current = this.traitNames[i];
            if (current[0] === name) {
                current[1] = current[1] + 1;
                return;
            }
        }
        this.traitNames.push([name, 1]);
    }

    removeTrait(index: number): void {
        let trait = this.traits[index];
        this.traits.splice(index, 1);
        //remove effects of the trait...
        trait.removeEffects(this);
        //remove trait name
        let name = trait.name;
        for (let i = 0; i < this.traitNames.length; i++) {
            let current = this.traitNames[i];
            if (current[0] === name) {
                current[1] = current[1] - 1;
                if (current[1] === 0) {
                    this.traitNames.splice(i, 1);
                }
                console.log(this.traitNames, this.traits);
                return;
            }
        }
    }

    statusCallback(callback: StatusCallbacks): void {
        const callbacks: Function[] = this.statuses.map(x => <Function> x[callback].bind(x));
        callbacks.forEach(x => x(this, this.opponent));
        this.statusBookkeeping();
    }

    statusFold(fold: StatusFolds, value: number): number {
        const foldingCallbacks: Function[] = this.statuses.map(x => <Function> x[fold].bind(x));
        const result: number = foldingCallbacks.reduce((acc, x) => x(acc), value);
        this.statusBookkeeping();
        return result;
    }

    private statusBookkeeping(): void {
        this.statuses = this.statuses.filter(status => status.isValid());
        this.statuses = this.statuses.sort((a, b) => a.getSortingNumber() - b.getSortingNumber());
    }

}
