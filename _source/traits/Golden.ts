/// <reference path="../ItemPool.ts" />
/// <reference path="../Trait.ts" />
/// <reference path="../statuses.ts" />
traits.add('golden',
    new Trait('Golden', new MoneybagsStatus(5), new BatteryStatus(3)),
);