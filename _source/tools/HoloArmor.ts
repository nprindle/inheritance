/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('holoarmor',
    new Tool('Holo-Armor', new Cost([3, CostTypes.Energy]),
        new GiveSelfStatusEffect(new DecoyStatus(1))
    )
);
