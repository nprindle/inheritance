/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('selfrepair',
    new Tool('Self Repair', new Cost([3, CostTypes.Battery]), new HealingEffect(2))
);
