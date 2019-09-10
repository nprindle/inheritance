/// <reference path="AbstractEffect" />
/// <reference path="Cost.ts" />

class Tool {
  _name: string;
  effect: AbstractEffect;
  cost: Cost;
  modifiers: string[];

  constructor(name: string, effect: AbstractEffect, cost: Cost) {
    this._name = name;
    this.effect = effect;
    this.cost = cost;
    this.modifiers = [];
  }

  get name() {
    return `${this.modifiers.join(' ')} ${this._name}`;
  }

  addModifier(modifier: AbstractEffect, text: string): void {
    modifier.next = this.effect;
    this.effect = modifier;
    this.modifiers.push(text);
  }

  use(user: Combatant, target: Combatant): void {
    this.effect.activate(user, target);
  }

}
