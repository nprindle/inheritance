/// <reference path="map/RoomType.ts" />
/// <reference path="map/RoomEvent.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="Random.ts" />

abstract class RoomEventPool {
    abstract getEvents(): RoomEvent[];
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
        const enemies =  Arrays.generate(Random.tupleInt(this.num), () => Game.currentRun.nextEnemy(this.tags));
        return enemies.map(enemy => new EnemyRoomEvent(enemy));
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
        //generate compliant enemies
        const enemies =  Arrays.generate(Random.tupleInt(this.num), () => Game.currentRun.nextEnemy(this.tags));
        //give them each an elite trait
        enemies.forEach(enemy => enemy.addLootTrait(Game.currentRun.nextTrait([TraitTags.elite])));
        return enemies.map(enemy => new EnemyRoomEvent(enemy));
    }

}

class ShopEventPool extends RoomEventPool {
    num: [number, number];
    traitTags: TraitTags[];
    modifierTags: ModifierTags[];

    constructor(min: number, max: number, traitTags: TraitTags[], modifierTags: ModifierTags[]) {
        super();
        this.num = [min, max];
        this.modifierTags = modifierTags;
        this.traitTags = traitTags;
    }

    getEvents(): RoomEvent[] {
        //generate compliant enemies
        const shops = Arrays.generate(Random.tupleInt(this.num), () => new Shop(this.modifierTags, this.traitTags));
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
        new ModifierEventPool(2, 4, []),
        new EliteEnemyEventPool(1, 1, [EnemyTags.level1]),
        new ShopEventPool(7, 10, [], []) //TODO make this a more reasonable number after testing
    ])
];
