/// <reference path="AbstractEffect" />
/// <reference path="Cost.ts" />

class Tool {
  name: string;
  effect: AbstractEffect;
  cost: Cost;

  constructor(name: string, effect: AbstractEffect, cost: Cost) {
    this.name = name;
    this.effect = effect;
    this.cost = cost;
  }

  addModifier(modifier: AbstractEffect) {
    modifier.next = this.action;
    this.action = modifier;
  }

}
