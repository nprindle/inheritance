/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('bandages',
  new Tool('Bandages', new Cost([1, CostTypes.Energy]), new HealingEffect(1))
);
