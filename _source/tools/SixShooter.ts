/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('sixshooter',
    new Tool('Six Shooter', new Cost([3, CostTypes.Energy]), new RepeatingEffect(new DamageEffect(1), 6), new UsesPerTurnMod(1))
);
