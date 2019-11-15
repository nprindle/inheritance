/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('reinforce',
    new Tool('Reinforce', new Cost([1, CostTypes.Energy]), new GiveSelfStatusEffect(new ShieldStatus(10)))
);
