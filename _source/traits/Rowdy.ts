/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('rowdy',
    new Trait('Rowdy', new ConfusionStatus(1), new StrengthStatus(1)),
    TraitTags.standard
);
