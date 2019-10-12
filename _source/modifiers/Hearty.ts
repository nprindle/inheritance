/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('hearty',
  new Modifier('Hearty', new CounterEffect(new HealingEffect(1), 5))
);
