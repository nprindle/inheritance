/// <reference path="AbstractEffect" />
/// <reference path="Cost.ts" />

class Tool {
  _name: string;
  effects: AbstractEffect[];
  cost: Cost;
  modifiers: string[];

  constructor(name: string, cost: Cost, ...effects: AbstractEffect[]) {
    this._name = name;
    this.effects = effects;
    this.cost = cost;
    this.modifiers = [];
  }

  get name() {
    return `${this.modifiers.join(' ')} ${this._name}`;
  }

  addModifier(modifier: AbstractEffect, text: string): void {
    this.effects.push(modifier);
    this.modifiers.push(text);
  }

  use(user: Combatant, target: Combatant): void {
    for (let i = 0; i < this.effects.length; i++) {
      this.effects[i].activate(user, target);
    }
  }

  effectsString(): string {
    let acc = [];
    for (let i = 0; i < this.effects.length; i++) {
      acc.push(this.effects[i].toString() + '.');
    }
    return acc.join(' ');
  }

}
