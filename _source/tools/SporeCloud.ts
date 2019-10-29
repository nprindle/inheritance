/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('sporecloud',
    new Tool('Spore Cloud', new Cost([2, CostTypes.Energy]), new OwnStatusTriggeredEffect(new FungalStatus(1), new DamageEffect(2)), new RemoveSelfStatusEffect(new FungalStatus(1)))
);
