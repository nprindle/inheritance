/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../modifiers.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('slimemoulder',
    new Enemy('Slime Moulder', 32, 2, AiUtilityFunctions.aggressiveUtility,
        modifiers.get('vampiric')!.apply(tools.get('mycelium')!),
        tools.get('sporecloud')!,
        tools.get('mitosisreflex')!
    ),
EnemyTags.level2);
