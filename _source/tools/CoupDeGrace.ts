/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('coupdegrace',
    new Tool('Coup de Grace', new Cost([1, CostTypes.Energy]),
    new DamageEffect(2),
        new PredicateEffect(
            new TargetDeadPredicate(),
            new GiveSelfRandomTraitEffect(TraitTags.coupdegracereward)
        ),
        new UsesPerFightMod(1))
);
