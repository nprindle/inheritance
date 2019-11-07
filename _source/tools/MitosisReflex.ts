/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('mitosisreflex',
    new Tool('Mitosis Reflex', new Cost([1, CostTypes.Energy]), new HealingEffect(-1), new HalveMaxHealthEffect())
);
