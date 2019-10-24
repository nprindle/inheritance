/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('wrench',
    new Tool('Wrench', new Cost([1, CostTypes.Energy]), new DamageEffect(1))
);
