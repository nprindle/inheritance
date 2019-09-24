/// <reference path="AbstractEffect" />
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
  modifiers: string[];
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
    return `${this.modifiers.join(' ')} ${this._name}${multString}`;
  }

  use(user: Combatant, target: Combatant): void {
    if (!user.canAfford(this.cost) || this.usesLeft <= 0) {
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

}
