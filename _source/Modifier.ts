/// <reference path="AbstractEffect.ts" />
/// <reference path="Cost.ts" />
/// <reference path="Strings.ts" />

enum ModifierTypes {
    CostMult,
    MultAdd,
    AddEnergyCost,
    Effect,
    UsesPerTurn,
    EnergyToHealth
}

class Modifier {

    name: string;
    effects: AbstractEffect[];
    costMultiplier: number;
    costAdd: Cost;
    multiplierAdd: number;
    usesPerTurn: number;
    transferEnergyToHealth: boolean;

    constructor(name: string, ...args: ([ModifierTypes, number] | AbstractEffect)[]) {
        this.name = name;
        this.effects = [];
        this.costMultiplier = 1;
        this.multiplierAdd = 0;
        this.usesPerTurn = Infinity;
        this.transferEnergyToHealth = false;
        this.costAdd = new Cost();
        for (let curr of args) {
            if (curr instanceof AbstractEffect) {
                this.effects.push(curr);
            } else if (curr instanceof Array && typeof curr[0] === 'number' && typeof curr[1] === 'number') {
                this.addTuple(curr);
            }
        }
    }

    addTuple(t: [ModifierTypes, number]): void {
        switch (t[0]) {
            case ModifierTypes.CostMult:
                this.costMultiplier = t[1];
                break;
            case ModifierTypes.MultAdd:
                this.multiplierAdd = t[1];
                break;
            case ModifierTypes.AddEnergyCost:
                this.costAdd.addTuple([t[1], CostTypes.Energy]);
                break;
            case ModifierTypes.UsesPerTurn:
                this.usesPerTurn = t[1];
                break;
            case ModifierTypes.EnergyToHealth:
                this.transferEnergyToHealth = true;
                break;
        }
    }

    apply(t: Tool): Tool {
        t.addModifierString(this.name);
        t.cost.scale(this.costMultiplier);
        t.cost.addCost(this.costAdd);
        t.multiplier += this.multiplierAdd;
        t.usesPerTurn = Math.min(this.usesPerTurn, t.usesPerTurn);
        if (this.transferEnergyToHealth) {
            t.cost.healthCost += t.cost.energyCost;
            t.cost.energyCost = 0;
        }
        for (let effect of this.effects) {
            t.effects.push(effect.clone());
        }
        return t;
    }

    describe(): string {
        let acc = [];
        if (this.costMultiplier !== 1) {
            acc.push(`cost x${this.costMultiplier}`);
        }
        if (this.multiplierAdd > 0) {
            acc.push(`multiplier +${this.multiplierAdd}`);
        }
        if (this.costAdd.magnitude() > 0) {
            acc.push(this.costAdd.addString());
        }
        if (this.usesPerTurn < Infinity) {
            acc.push(`limited to ${this.usesPerTurn} use(s) per turn`);
        }
        if (this.transferEnergyToHealth) {
            acc.push('costs health instead of energy');
        }
        if (this.effects.length > 0) {
            let effectStrings = this.effects.map(x => x.toString());
            acc.push(`Add effect(s): ${effectStrings.map(x => Strings.capitalize(x)).join('. ')}.`);
        }
        return Strings.conjoin(acc);
    }

    clone(): Modifier {
        return this;
    }

}
