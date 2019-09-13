/// <reference path="AbstractEffect" />
/// <reference path="Cost.ts" />
/// <reference path="Strings.ts" />

class Tool {
  _name: string;
  effects: AbstractEffect[];
  cost: Cost;
  modifiers: string[];
  multiplier: number;

  constructor(name: string, cost: Cost, ...effects: AbstractEffect[]) {
    this._name = name;
    this.effects = effects;
    this.cost = cost;
    this.modifiers = [];
    this.multiplier = 1;
  }

  get name() {
    let multString = '';
    if (this.multiplier > 1) {
      multString = ` x${this.multiplier}`;
    }
    if (this.modifiers.length === 0) {
      return `${this._name}${multString}`;
    }
    return `${this.modifiers.join(' ')} ${this._name}${multString}`;
  }

  use(user: Combatant, target: Combatant): void {
    for (let i = 0; i < this.multiplier; i++) {
      for (let i = 0; i < this.effects.length; i++) {
        this.effects[i].activate(user, target);
      }
    }
  }

  effectsString(): string {
    let acc = [];
    for (let i = 0; i < this.effects.length; i++) {
      acc.push(Strings.capitalize(this.effects[i].toString()) + '.');
    }
    return acc.join(' ');
  }

}
