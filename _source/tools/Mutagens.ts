/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('mutagens',
    new Tool('Mutagens', new Cost([2, CostTypes.Energy]), new GiveSelfRandomTraitEffect())
);
