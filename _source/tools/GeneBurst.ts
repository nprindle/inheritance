/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('geneburst',
    new Tool('Gene Burst', new Cost([1, CostTypes.Energy]), new TraitTriggeredEffect(new DamageEffect(2)), new LoseAllTraitsEffect())
);
