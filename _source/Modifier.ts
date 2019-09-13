/// <reference path="AbstractEffect.ts" />

enum ModifierTypes {
  CostMult = 'Cost Mult',
  MultAdd = 'Mult Add',
  Effect = 'Effect'
}

class Modifier {

  name: string;
  desc: string;
  effects: AbstractEffect[];
  costMultiplier: number;
  multiplierAdd: number;

  constructor(name: string, desc: string, ...args: ([ModifierTypes, number] | AbstractEffect)[]) {
    this.name = name;
    this.desc = desc;
    this.effects = [];
    this.costMultiplier = 1;
    this.multiplierAdd = 0;
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
    }
  }

  apply(t: Tool): void {
    t.modifiers.push(this.name);
    t.cost.scale(this.costMultiplier);
    t.multiplier += this.multiplierAdd;
    for (let i = 0; i < this.effects.length; i++) {
      t.effects.push(this.effects[i]);
    }
  }

}
