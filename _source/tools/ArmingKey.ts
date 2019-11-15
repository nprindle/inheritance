/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('armingkey',
    new Tool('Arming Key', new Cost([1, CostTypes.Energy]), new GiveSelfStatusEffect(new CountDownStatus(10, 30)))
);
