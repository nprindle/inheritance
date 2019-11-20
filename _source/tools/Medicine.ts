/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../traits.ts" />
tools.add('medicine',
    new Tool('Medicine', new Cost([5, CostTypes.Energy]),
    new GiveOtherTraitEffect(traits.get('healthy')!),
    new UsesPerFightMod(1)
    ));
