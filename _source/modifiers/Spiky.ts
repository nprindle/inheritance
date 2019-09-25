/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('spiky',
  new Modifier('Spiky', 'Weapon does 1 damage, too. +1 Energy Cost', [ModifierTypes.AddEnergyCost, 1], new DamageEffect(1))
);
