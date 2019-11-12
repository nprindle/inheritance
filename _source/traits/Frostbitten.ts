/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('frostbitten',
    new Trait('Frostbitten', new FreezeStatus(1)),
    TraitTags.curse
);
