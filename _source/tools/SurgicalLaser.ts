/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('surgicallaser',
    new Tool('Surgical Laser', new Cost([2, CostTypes.Energy]), new DamageEffect(20),)
);
