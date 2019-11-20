/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../traits.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('surgeonbot',
    new Enemy('Surgery Bot', 20, 2, AiUtilityFunctions.aggressiveUtility,
        [
            tools.get('surgicallaser')!, tools.get('coat')!
        ],
        [
            traits.get('pacifist')!
        ]
    ),
EnemyTags.level3);
