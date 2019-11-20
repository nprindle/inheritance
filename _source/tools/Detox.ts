/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('detox',
    new Tool('Detox', new Cost([1, CostTypes.Energy]), new PredicateEffect(new UserStatusPredicate(new PoisonStatus(1)), new CombinationEffect(new RemoveSelfStatusEffect(new PoisonStatus(1)), new HealingEffect(5))))
);
