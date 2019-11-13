/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('greasertron',
    new Enemy('Greaser-Tron', 10, 6, AiUtilityFunctions.cautiousUtility, [tools.get('lighter')!, tools.get('switchblade')!, tools.get('comb')!], []),
EnemyTags.level1);
