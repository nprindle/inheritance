/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('singleton',
    new Tool('Singleton', new Cost([1, CostTypes.Energy]), new DamageEffect(5), new UsesPerTurnMod(1))
);
