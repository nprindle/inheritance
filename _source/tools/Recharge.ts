/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('recharge',
    new Tool('Recharge', new Cost([3, CostTypes.Health]), new GiveSelfStatusEffect(new BatteryStatus(2)))
);
