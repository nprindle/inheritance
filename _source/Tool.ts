/// <reference path="AbstractAction.ts" />
/// <reference path="Cost.ts" />

abstract class Tool {
  name: string;
  effect: AbstractAction;
  cost: Cost;

  constructor(name: string, effect: AbstractEffect, cost: Cost) {
    this.name = name;
    this.effect = effect;
    this.cost = cost;
  }

}
