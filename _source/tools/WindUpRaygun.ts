/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('windupraygun',
    new Tool('Wind-Up Ray Gun', new Cost([1, CostTypes.Energy]), new CounterEffect(new DamageEffect(10), 3), new UsesPerTurnMod(1))
);
