/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../traits.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('slimemoulder',
    new Enemy('Slime Moulder', 16, 2, AiUtilityFunctions.aggressiveUtility,
        [
            tools.get('mycelium')!,
            tools.get('sporecloud')!,
            tools.get('mitosisreflex')!,
        ],
        [
            traits.get('tough')!
        ]
    ),
EnemyTags.level2);
