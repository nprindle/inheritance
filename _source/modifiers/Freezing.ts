/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('freezing',
    new Modifier('Freezing', new GiveSelfStatusEffect(new FreezeStatus(1)), new GiveOtherStatusEffect(new FreezeStatus(2)))
);
