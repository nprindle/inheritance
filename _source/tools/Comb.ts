/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('comb',
    new Tool('Comb', new Cost([1, CostTypes.Energy]), new GiveSelfStatusEffect(new ShieldStatus(3)), new UsesPerTurnMod(1))
);
