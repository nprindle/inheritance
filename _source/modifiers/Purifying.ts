/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('purifying',
    new Modifier('Purifying', [ModifierTypes.AddEnergyCost, 2], new ChangeUserNegativeStatuses(-1))
);
