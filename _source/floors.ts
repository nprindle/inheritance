/// <reference path="map/RoomType.ts" />
/// <reference path="map/RoomEvent.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="Random.ts" />

enum FloorModifiers {
    NO_EXIT
}

abstract class RoomEventPool {
    abstract getEvents(): RoomEvent[];
}

function enemyTagToLootMoney(tag: EnemyTags): number {
    switch (tag) {
        case EnemyTags.level1:
            return 1;
        case EnemyTags.level2:
            return 2;
        case EnemyTags.level3:
            return 3;
        case EnemyTags.boss:
            return 4;
        default:
            return 0;
    }
}

class EnemyEventPool extends RoomEventPool {

    tags: EnemyTags[];
    num: [number, number]

    constructor(min: number, max: number, tags: EnemyTags[]) {
        super();
        this.num = [min, max];
        this.tags = tags;
    }

    getEvents(): RoomEvent[] {
        const num: number = Random.tupleInt(this.num);
        const result: EnemyRoomEvent[] = [];
        for (let i = 0; i < num; i++) {
            const tag: EnemyTags = Random.fromArray(this.tags);
            const enemy = Game.currentRun.nextEnemy([tag]);
            enemy.setLootMoney(enemyTagToLootMoney(tag));
            if (tag === EnemyTags.boss) {
                enemy.isFinalBoss = true;
            }
            const event = new EnemyRoomEvent(enemy);
            //special icons for special lads
            if (tag === EnemyTags.goldfish) {
                event.roomIcon = RoomIcon.GOLDFISH;
            } else if (tag === EnemyTags.boss) {
                event.roomIcon = RoomIcon.BOSS;
            }
            result.push(event);
        }
        return result;
    }

}

class TraitEventPool extends RoomEventPool {

    tags: TraitTags[];
    num: [number, number]

    constructor(min: number, max: number, tags: TraitTags[]) {
        super();
        this.num = [min, max];
        this.tags = tags;
    }

    getEvents(): RoomEvent[] {
        const traits =  Arrays.generate(Random.tupleInt(this.num), () => Game.currentRun.nextTrait(this.tags));
        return traits.map(trait => new TraitRoomEvent(trait));
    }

}

class ModifierEventPool extends RoomEventPool {

    tags: ModifierTags[];
    num: [number, number];

    constructor(min: number, max: number, tags: ModifierTags[]) {
        super();
        this.num = [min, max];
        this.tags = tags;
    }

    getEvents(): RoomEvent[] {
        const mods =  Arrays.generate(Random.tupleInt(this.num), () => Game.currentRun.nextModifier(this.tags));
        return mods.map(modifier => new ModifierRoomEvent(modifier));
    }

}

class EliteEnemyEventPool extends RoomEventPool {

    num: [number, number];
    tags: EnemyTags[];

    constructor(min: number, max: number, tags: EnemyTags[]) {
        super();
        this.num = [min, max];
        this.tags = tags;
    }

    getEvents(): RoomEvent[] {
        const num: number = Random.tupleInt(this.num);
        const result: Enemy[] = [];
        for (let i = 0; i < num; i++) {
            const tag: EnemyTags = Random.fromArray(this.tags);
            const enemy = Game.currentRun.nextEnemy([tag]);
            enemy.addLootTrait(Game.currentRun.nextTrait([TraitTags.elite]));
            enemy.setLootMoney(2 * enemyTagToLootMoney(tag));
            result.push(enemy);
        }
        return result.map(enemy => new EnemyRoomEvent(enemy));
    }

}

class ShopEventPool extends RoomEventPool {
    num: [number, number];
    modifierCounts: [ModifierTags, number][];
    traitCounts: [TraitTags, number][];

    constructor(min: number, max: number, modifierCounts: [ModifierTags, number][], traitCounts: [TraitTags, number][]) {
        super();
        this.num = [min, max];
        this.modifierCounts = modifierCounts;
        this.traitCounts = traitCounts;
    }

    getEvents(): RoomEvent[] {
        const shops = Arrays.generate(Random.tupleInt(this.num), () => new Shop(this.modifierCounts, this.traitCounts));
        return shops.map(shop => new ShopRoomEvent(shop));
    }
}

class CollectibleEventPool extends RoomEventPool {
    
    num: [number, number];
    scripRewardRange: [number, number];

    constructor(min: number, max: number, scripRewardRange: [number, number]) {
        super();
        this.num = [min, max];
        this.scripRewardRange = scripRewardRange;
    }

    getEvents(): RoomEvent[] {
        return Arrays.generate(Random.tupleInt(this.num), () => new CollectibleRoomEvent(this.scripRewardRange));
    }
}

class FloorConfig {

    name: string;

    numRooms: [number, number];

    eventPools: RoomEventPool[];

    modifiers: FloorModifiers[];

    constructor(name: string, numRooms: [number, number], eventPools: RoomEventPool[], ...modifiers: FloorModifiers[]) {
        this.name = name;
        this.numRooms = numRooms;
        this.eventPools = eventPools;
        this.modifiers = modifiers;
    }

    getEvents(): RoomEvent[] {
        return Arrays.flatten(this.eventPools.map(eventPool => eventPool.getEvents()));
    }

    getNumRooms(): number {
        return Random.tupleInt(this.numRooms);
    }

    getWidth(): number {
        return 5;
    }

    getHeight(): number {
        return 5;
    }

}

const floors: FloorConfig[] = [
    new FloorConfig("The Foyer", [12, 15], [
        new EnemyEventPool(2, 4, [EnemyTags.level1]),
        new TraitEventPool(1, 2, [TraitTags.standard]),
        new ModifierEventPool(1, 2, []),
        new ShopEventPool(1, 1, [[null, 5]], [[TraitTags.elite, 2], [TraitTags.standard, 2], [TraitTags.curse, 1]]),
        new CollectibleEventPool(1, 1, [1, 3]),
    ]),
    new FloorConfig("The Lounge", [14, 17], [
        new EnemyEventPool(2, 4, [EnemyTags.level2]),
        new TraitEventPool(1, 2, [TraitTags.standard]),
        new ModifierEventPool(1, 2, []),
        new EliteEnemyEventPool(1, 1, [EnemyTags.level1]),
        new ShopEventPool(1, 1, [[null, 5]], [[TraitTags.elite, 2], [TraitTags.standard, 2], [TraitTags.curse, 1]]),
        new CollectibleEventPool(1, 1, [2, 5]),
    ]),
    new FloorConfig("The Library", [18, 20], [
        new EnemyEventPool(2, 4, [EnemyTags.level3]),
        new TraitEventPool(1, 2, [TraitTags.standard]),
        new ModifierEventPool(1, 2, []),
        new EliteEnemyEventPool(1, 1, [EnemyTags.level2]),
        new ShopEventPool(1, 1, [[null, 5]], [[TraitTags.elite, 2], [TraitTags.standard, 2], [TraitTags.curse, 1]]),
        new CollectibleEventPool(1, 1, [2, 5]),
    ]),
    new FloorConfig("The Attic", [4, 5], [
        new EnemyEventPool(1, 1, [EnemyTags.boss]),
    ], FloorModifiers.NO_EXIT),
];
