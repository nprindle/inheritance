/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('claws',
    new Tool('Claws', new Cost([1, CostTypes.Energy]), new PredicateEffect(
        new UserStatusPredicate(new FlowStatus(1)),
        new CombinationEffect(
            new DamageEffect(3),
            new GiveSelfStatusEffect(new FlowStatus(-1))
        ),
        new DamageEffect(1)
    ))
);
