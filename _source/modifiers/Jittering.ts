/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('jittering',
  new Modifier('Jittering', [ModifierTypes.CostMult, 2], [ModifierTypes.MultAdd, 1])
);
