/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('timebomb',
    new Enemy('Tim Bomb', 40, 1, AiUtilityFunctions.defensiveUtility, [tools.get('reinforce')!, tools.get('detox')!, tools.get('armingkey')!], []),
EnemyTags.level2);
