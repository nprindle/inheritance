/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('creepingcarpet',
    new Enemy('Creeping Carpet', 10, 2, AiUtilityFunctions.aggressiveUtility, tools.get('mycelium')!, tools.get('sporecloud')!),
EnemyTags.level1);
