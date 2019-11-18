/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../traits.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('medicbot',
    new Enemy('Medic Bot', 5, 5, AiUtilityFunctions.friendlyUtility,
        [
            tools.get('medicine')!, tools.get('analgesic')!, tools.get('surgicallaser')!, tools.get('scalpel')!
        ],
        []
    ),
EnemyTags.level3);
