/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('mildewed',
    new Modifier('Mildewed', new ChanceEffect(0.25, new GiveSelfStatusEffect(new FungalStatus(1))))
);
