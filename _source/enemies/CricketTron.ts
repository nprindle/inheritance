/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('crickettron',
    new Enemy('Cricket-Tron', 25, 5, AiUtilityFunctions.cautiousUtility, [
        modifiers.get('strengthening').apply(tools.get('mallet'))
    ], []),
EnemyTags.level2);
