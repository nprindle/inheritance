/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('mutagens',
    new Tool('Mutagens', new Cost([1, CostTypes.Energy]), new GiveSelfRandomTraitEffect())
);
