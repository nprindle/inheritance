/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('coat',
    new Tool('Coat', new Cost([1, CostTypes.Energy]), new GiveSelfStatusEffect(new ShieldStatus(5)), new UsesPerTurnMod(1))
);
