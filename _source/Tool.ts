/// <reference path="AbstractEffect.ts" />
/// <reference path="Cost.ts" />
/// <reference path="Strings.ts" />

abstract class ToolMod {
    abstract apply(t: Tool): void;
}

class UsesMod extends ToolMod {

    num: number;

    constructor(n: number) {
        super();
        this.num = n;
    }

    apply(t: Tool): void {
        t.usesPerTurn = this.num;
    }

}

class Tool {
    _name: string;
    effects: AbstractEffect[];
    cost: Cost;
    modifiers: [string, number][];
    multiplier: number;
    usesPerTurn: number;
    usesLeft: number;

    constructor(name: string, cost: Cost, ...effects: (AbstractEffect | ToolMod)[]) {
        this._name = name;
        this.cost = cost;
        this.effects = [];
        this.modifiers = [];
        this.multiplier = 1;
        this.usesPerTurn = Infinity;
        this.usesLeft = this.usesPerTurn;
        for (let i = 0; i < effects.length; i++) {
            let curr = effects[i];
            if (curr instanceof AbstractEffect) {
                this.effects.push(curr);
            } else if (curr instanceof ToolMod) {
                curr.apply(this);
            }
        }
    }

    get name() {
        let multString = '';
        if (this.modifiers.length === 0) {
            return `${this._name}${multString}`;
        }
        return `${this.modifiers.map(Strings.powerTuple).join(' ')} ${this._name}${multString}`;
    }

    usableBy(user: Combatant): boolean {
        return user.canAfford(this.cost) && this.usesLeft > 0;
    }

    use(user: Combatant, target: Combatant): void {
        if (!this.usableBy(user)) {
            return;
        }
        user.pay(this.cost);
        for (let i = 0; i < this.multiplier; i++) {
            for (let i = 0; i < this.effects.length; i++) {
                this.effects[i].activate(user, target);
            }
        }
        this.usesLeft--;
    }

    refresh(): void {
        this.usesLeft = this.usesPerTurn;
    }

    effectsString(): string {
        let acc = [];
        for (let i = 0; i < this.effects.length; i++) {
            acc.push(Strings.capitalize(this.effects[i].toString()) + '.');
        }
        return acc.join(' ');
    }

    addModifierString(str: string): void {
        for (let i = 0; i < this.modifiers.length; i++) {
            if (this.modifiers[i][0] === str) {
                this.modifiers[i][1]++;
                return;
            }
        }
        this.modifiers.push([str, 1]);
    }

    clone(): Tool {
        let effectsClones = this.effects.map(x => x.clone());
        let t = new Tool(this.name, this.cost.clone(), ...effectsClones);
        t.usesPerTurn = this.usesPerTurn;
        t.multiplier = this.multiplier;
        let modifiers: [string, number][] = [];
        for (let i = 0; i < this.modifiers.length; i++) {
            modifiers[i] = [this.modifiers[i][0], this.modifiers[i][1]];
        }
        t.modifiers = modifiers;
        return t;
    }

}
