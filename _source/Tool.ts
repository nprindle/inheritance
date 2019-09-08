/// <reference path="AbstractAction.ts" />
/// <reference path="Cost.ts" />

abstract class Tool {
  name: string;
  action: AbstractAction;
  cost: Cost;

  constructor(name: string, action: AbstractAction, cost: Cost) {
    this.name = name;
    this.action = action;
    this.cost = cost;
  }

}
