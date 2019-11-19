/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('chilled',
    new Modifier('Chilled', new ChanceEffect(0.25, new GiveOtherStatusEffect(new FreezeStatus(1))))
);
