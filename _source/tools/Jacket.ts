/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('jacket',
    new Tool('Jacket', new Cost([2, CostTypes.Energy]), new GiveSelfStatusEffect(new ShieldStatus(5)), new UsesMod(1))
);
