/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('moldy',
    new Modifier('Moldy', [ModifierTypes.MultAdd, 1], new ChanceEffect(0.125, new GiveOtherStatusEffect(new FungalStatus(1))))
);
