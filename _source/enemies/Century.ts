/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

// TODO: make AI good
enemies.add('century',
    new Enemy('Century', 50, 7, AiUtilityFunctions.cautiousUtility, [
        tools.get('pendulum')!,
        tools.get('bell')!,
        tools.get('hourhand')!
    ], []),
EnemyTags.boss);
