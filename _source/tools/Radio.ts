/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('radio',
    new Tool('Radio', new Cost([2, CostTypes.Energy]), new GiveOtherStatusEffect(new AngryStatus(1)), new UsesPerTurnMod(1))
);
