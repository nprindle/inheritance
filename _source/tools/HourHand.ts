/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../predicates.ts" />
/// <reference path="../statuses.ts" />
tools.add('hourhand',
    new Tool('Hour Hand', new Cost([1, CostTypes.Energy]),
        new CounterEffect(new DamageEffect(12), 12),
    )
);
