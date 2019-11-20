/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('parasiticspores',
    new Tool('Parasitic Spores', new Cost([2, CostTypes.Energy]), new OwnStatusTriggeredEffect(new FungalStatus(1), new LeechEffect(2)), new RemoveSelfStatusEffect(new FungalStatus(1)))
);
