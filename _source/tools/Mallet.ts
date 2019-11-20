/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('mallet',
    new Tool('Mallet', new Cost([1, CostTypes.Energy]), new DamageEffect(1))
);
