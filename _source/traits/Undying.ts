/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('undying',
    new Trait('Undying', new SurviveStatus(3), new RotStatus(2)),
    TraitTags.elite, TraitTags.randomable
);
