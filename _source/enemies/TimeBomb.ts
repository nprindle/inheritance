/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('timebomb',
    new Enemy('Time Bomb', 10, 2, AiUtilityFunctions.defensiveUtility, [tools.get('armingkey')!], []),
EnemyTags.level1);
