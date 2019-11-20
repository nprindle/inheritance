/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('annoying',
    new Modifier('Annoying', [ModifierTypes.MultAdd, 1], new ChanceEffect(0.25, new GiveOtherStatusEffect(new AngryStatus(1))))
);
