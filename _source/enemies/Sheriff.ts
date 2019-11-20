/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../traits.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('sheriff',
    new Enemy('Sheriff-omatic', 10, 5, AiUtilityFunctions.cautiousUtility,
        [
            tools.get('cowboyrevolver')!,
            tools.get('widebrimmedhat')!,
        ],
        []
    ),
EnemyTags.level1);
