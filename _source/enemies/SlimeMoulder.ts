/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../traits.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('slimemoulder',
    new Enemy('Slime Moulder', 20, 2, AiUtilityFunctions.cautiousUtility,
        [
            tools.get('mycelium')!,
            tools.get('sporecloud')!,
            tools.get('mitosisreflex')!,
        ],
        []
    ),
EnemyTags.level2);
