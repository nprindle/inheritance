/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('heated',
    new Modifier('Heated', new ChanceEffect(0.25, new GiveOtherStatusEffect(new BurnStatus(1))))
);
