/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../traits.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('dearthcap',
    new Enemy('Dearth Cap', 20, 4, AiUtilityFunctions.cautiousUtility,
        [
            tools.get('mycelium')!,
            tools.get('parasiticspores')!
        ],
        []
    ),
EnemyTags.level3);
