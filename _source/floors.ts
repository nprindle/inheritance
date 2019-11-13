/// <reference path="map/RoomType.ts" />
/// <reference path="map/RoomEvent.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="Random.ts" />

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
        const result: Enemy[] = [];
        for (let i = 0; i < num; i++) {
            const tag: EnemyTags = Random.fromArray(this.tags);
            const enemy = Game.currentRun.nextEnemy([tag]);
            enemy.setLootMoney(enemyTagToLootMoney(tag));
            result.push(enemy);
        }
        return result.map(enemy => new EnemyRoomEvent(enemy));
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
        //generate compliant enemies
        const shops = Arrays.generate(Random.tupleInt(this.num), () => new Shop(this.modifierCounts, this.traitCounts));
        return shops.map(shop => new ShopRoomEvent(shop));
    }
}

class FloorConfig {

    name: string;

    numRooms: [number, number];

    eventPools: RoomEventPool[];

    constructor(name: string, numRooms: [number, number], eventPools: RoomEventPool[]) {
        this.name = name;
        this.numRooms = numRooms;
        this.eventPools = eventPools;
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
        new EliteEnemyEventPool(1, 1, [EnemyTags.level1]),
        new ShopEventPool(1, 3, [[null, 5]], [[TraitTags.elite, 2], [TraitTags.standard, 2], [TraitTags.curse, 1]]),
    ]),
    new FloorConfig("The Lounge", [12, 15], [
        new EnemyEventPool(1, 2, [EnemyTags.level1]),
        new EnemyEventPool(1, 2, [EnemyTags.level2]),
        new TraitEventPool(1, 2, [TraitTags.standard]),
        new ModifierEventPool(1, 2, []),
        new EliteEnemyEventPool(1, 1, [EnemyTags.level1]),
        new ShopEventPool(1, 3, [[null, 5]], [[TraitTags.elite, 2], [TraitTags.standard, 2], [TraitTags.curse, 1]]),
    ])
];
