/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('sunburned',
    new Trait('Sunburned', new BurnStatus(1)),
    TraitTags.curse, TraitTags.randomable
);
