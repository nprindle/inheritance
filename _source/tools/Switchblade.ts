/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('switchblade',
    new Tool('Switchblade', new Cost([1, CostTypes.Energy]), new DamageEffect(1), new UsesMod(1))
);
