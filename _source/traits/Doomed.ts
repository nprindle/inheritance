/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('doomed',
    new Trait('Doomed', new DoomedStatus(10)),
    TraitTags.curse
);
