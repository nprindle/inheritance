/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('splash',
  new Tool('Splash', new Cost([1, CostTypes.Energy]), new NothingEffect())
);
