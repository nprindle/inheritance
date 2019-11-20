/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('faustian',
    new Modifier('Faustian', [ModifierTypes.MultAdd, 1], new ChanceEffect(0.01, new GiveSelfStatusEffect(new DoomedStatus(1))))
);
