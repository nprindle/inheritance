/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('jittering',
  new Modifier('Jittering', '+1 Multiplier. x2 Cost.', [ModifierTypes.CostMult, 2], [ModifierTypes.MultAdd, 1])
);
