/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('myceliated',
    new Trait('Myceliated', new FungalStatus(1)),
    TraitTags.standard, TraitTags.randomable
);
