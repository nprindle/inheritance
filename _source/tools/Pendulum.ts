/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../predicates.ts" />
/// <reference path="../statuses.ts" />
tools.add('pendulum',
    new Tool('Pendulum', new Cost([3, CostTypes.Energy]),
        new PredicateEffect(
            new TargetStatusPredicate(new DoomedStatus(1)),
            new GiveOtherStatusEffect(new DoomedStatus(-1)),
            new GiveOtherStatusEffect(new DoomedStatus(10))
        ), new UsesMod(1)
    )
);
