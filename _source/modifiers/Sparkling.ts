/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('sparkling',
    new Modifier('Sparkling', new ChanceEffect(0.125, new GiveSelfStatusEffect(new EnergizedStatus(1))))
);
