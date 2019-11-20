/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('goldfish',
    new Enemy('Goldfish', 100, 1, AiUtilityFunctions.cautiousUtility,
        [tools.get('splash')!],
        [traits.get('golden')!],
        'assets/goldfish.png'),
EnemyTags.goldfish);
