/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('guilting',
    new Modifier('Guilting', new ChanceEffect(0.1, new GiveOtherStatusEffect(new PacifistStatus(1))))
);
