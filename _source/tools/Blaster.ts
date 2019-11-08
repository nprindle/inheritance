/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('blaster',
    new Tool('Blaster', new Cost([2, CostTypes.Battery]), new DamageEffect(4))
);
