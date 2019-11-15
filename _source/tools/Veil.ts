/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('veil',
    new Tool('Veil', new Cost([2, CostTypes.Energy]), new ChangeUserNegativeStatuses(-1))
);
