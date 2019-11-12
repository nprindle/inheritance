/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('electrified',
    new Trait('Electrified', new EnergizedStatus(2)),
    TraitTags.elite
);
