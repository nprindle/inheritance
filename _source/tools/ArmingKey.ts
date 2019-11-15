/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
/// <reference path="../predicates.ts" />
tools.add('armingkey',
    new Tool('Arming Key', new Cost([0, CostTypes.Energy]), new PredicateEffect(new UserStatusPredicate(1, new CountDownStatus(1, 1)), new NothingEffect(), (new PredicateEffect(new UserLacksStatusPredicate(new ConfusionStatus(1)), new GiveSelfStatusEffect(new CountDownStatus(5, 30)), new GiveSelfStatusEffect(new CountDownStatus(20, 30))))))
);

