/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('burning',
    new Modifier('Burning', new GiveSelfStatusEffect(new BurnStatus(1)), new GiveOtherStatusEffect(new BurnStatus(2)))
);
