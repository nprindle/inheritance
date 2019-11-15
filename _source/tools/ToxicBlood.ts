/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('toxicblood',
    new Tool('Toxic Blood', new Cost([1, CostTypes.Health]), new GiveOtherStatusEffect(new PoisonStatus(2)))
);
