/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('dizzying',
    new Modifier('Dizzying', [ModifierTypes.MultAdd, 1], new ChanceEffect(0.25, new GiveSelfStatusEffect(new ConfusionStatus(1))))
);
