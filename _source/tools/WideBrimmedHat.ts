/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('widebrimmedhat',
    new Tool('Wide Brimmed Hat', new Cost([1, CostTypes.Energy]),
    new GiveSelfStatusEffect(new StrengthStatus(1)),
    new UsesPerFightMod(1))
);
