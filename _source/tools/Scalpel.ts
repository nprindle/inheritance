/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('scalpel',
    new Tool('Scalpel', new Cost([1, CostTypes.Energy]), new DamageEffect(2),)
);
