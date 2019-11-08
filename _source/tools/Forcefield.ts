/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('forcefield',
    new Tool('Forcefield', new Cost([2, CostTypes.Battery]), new GiveSelfStatusEffect(new ShieldStatus(5)))
);
