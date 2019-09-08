/// <reference path="AbstractAction.ts" />
/// <reference path="AbstractEffect" />
/// <reference path="Cost.ts" />

class Tool {
  name: string;
  action: AbstractAction;
  cost: Cost;

  constructor(name: string, action: AbstractAction, cost: Cost) {
    this.name = name;
    this.action = action;
    this.cost = cost;
  }

}
