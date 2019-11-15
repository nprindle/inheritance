/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../predicates.ts" />
/// <reference path="../statuses.ts" />
tools.add('bell',
    new Tool('Bell', new Cost(),
    new GainEnergyEffect(3),
    new PredicateEffect(
        new TargetStatusPredicate(new DoomedStatus(1)),
        new CombinationEffect(
            new GiveOtherStatusEffect(new DoomedStatus(2))
        ),
        new CombinationEffect(
            new GiveSelfStatusEffect(new DefenseStatus(-1))
        )
    ), new UsesMod(1)
    )
);
