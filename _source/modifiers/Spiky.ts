/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('spiky',
    new Modifier('Spiky', [ModifierTypes.AddEnergyCost, 1], new DamageEffect(1))
);
