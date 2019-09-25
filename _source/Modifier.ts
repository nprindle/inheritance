/// <reference path="AbstractEffect.ts" />
/// <reference path="Cost.ts" />

enum ModifierTypes {
  CostMult = 'Cost Mult',
  MultAdd = 'Mult Add',
  AddEnergyCost = 'Energy Cost Add',
  Effect = 'Effect'
}

class Modifier {

  name: string;
  desc: string;
  effects: AbstractEffect[];
  costMultiplier: number;
  costAdd: Cost;
  multiplierAdd: number;

  constructor(name: string, desc: string, ...args: ([ModifierTypes, number] | AbstractEffect)[]) {
    this.name = name;
    this.desc = desc;
    this.effects = [];
    this.costMultiplier = 1;
    this.multiplierAdd = 0;
    this.costAdd = new Cost();
    for (let i = 0; i < args.length; i++) {
      let curr = args[i];
      if (curr instanceof AbstractEffect) {
        this.effects.push(curr);
      } else if (curr instanceof Array && typeof curr[0] === 'string' && typeof curr[1] === 'number') {
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
    }
  }

  apply(t: Tool): void {
    t.modifiers.push(this.name);
    t.cost.scale(this.costMultiplier);
    t.cost.addCost(this.costAdd);
    t.multiplier += this.multiplierAdd;
    for (let i = 0; i < this.effects.length; i++) {
      t.effects.push(this.effects[i].clone());
    }
  }

}
