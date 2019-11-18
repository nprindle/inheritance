/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../traits.ts" />
tools.add('analgesic',
    new Tool('Analgesic', new Cost([5, CostTypes.Energy]),
    new GiveOtherTraitEffect(traits.get('tough')!),
    new UsesPerFightMod(1)
    ));
