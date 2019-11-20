/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('strengthening',
    new Modifier('Strengthening', new CounterEffect(new GiveSelfStatusEffect(new StrengthStatus(1)), 5))
);
