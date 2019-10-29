/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('boneclaws',
    new Tool('Bone Claws', new Cost([1, CostTypes.Energy]), new DamageEffect(4), new GiveOtherRandomTraitEffect())
);
