/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('delinquentgoldfish',
    new Enemy('Delinquent Goldfish', 100, 2, AiUtilityFunctions.aggressiveUtility, [tools.get('switchblade')!, tools.get('splash')!], [traits.get('golden')!], 'assets/goldfish.png'),
EnemyTags.goldfish);
