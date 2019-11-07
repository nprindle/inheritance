/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('decaying',
    new Trait('Decaying', new RotStatus(1)),
    TraitTags.curse
);
