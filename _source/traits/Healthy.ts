/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
traits.add('healthy',
    new Trait('Healthy', new GiveHealth(5)),
    TraitTags.standard
);
