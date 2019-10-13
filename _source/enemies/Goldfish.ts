/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />

enemies.add('goldfish',
    new Enemy('Goldfish', 10, 10, tools.get('splash')!, tools.get('wrench')!)
);
