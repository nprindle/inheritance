/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('rawhideskin',
    new Tool('Rawhide Skin', new Cost([2, CostTypes.Energy]),
        new PayWithRandomTraitEffect(new GiveSelfStatusEffect(new ShieldStatus(5)))
    )
);
