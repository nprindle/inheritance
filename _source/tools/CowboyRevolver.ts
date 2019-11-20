/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('cowboyrevolver',
    new Tool('Cowboy Revolver', new Cost([4, CostTypes.Energy]), new NonlethalDamageEffect(3),)
);
