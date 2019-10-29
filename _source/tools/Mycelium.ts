/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('mycelium',
    new Tool('Mycelium', new Cost([1, CostTypes.Energy]), new GiveSelfStatusEffect(new FungalStatus(1)))
);
