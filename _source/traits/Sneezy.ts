/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('sneezy',
    new Trait('Sneezy', new PoisonStatus(3)),
    TraitTags.curse, TraitTags.randomable
);
