/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
traits.add('robust',
    new Trait('Robust', new GiveHealth(10)),
    TraitTags.elite, TraitTags.randomable
);
