/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('hasty',
    new Trait('Hasty', new EnergizedStatus(2), new EnergyDebtStatus(2))
);
