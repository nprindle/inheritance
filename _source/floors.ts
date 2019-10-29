/// <reference path="map/RoomType.ts" />
/// <reference path="map/RoomEvent.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="Random.ts" />

class FloorConfig {

    numRooms: [number, number];

    enemyTags: EnemyTags[];
    numEnemies: [number, number];

    modifierTags: ModifierTags[];
    numModifiers: [number, number];

    traitTags: TraitTags[];
    numTraits: [number, number];

    constructor(numRooms: [number, number], enemyTags: EnemyTags[], numEnemies: [number, number], modifierTags: ModifierTags[], numModifiers: [number, number], traitTags: TraitTags[], numTraits: [number, number]) {
        this.numRooms = numRooms;
        this.enemyTags = enemyTags;
        this.numEnemies = numEnemies;
        this.modifierTags = modifierTags;
        this.numModifiers = numModifiers;
        this.traitTags = traitTags;
        this.numTraits = numTraits;
    }

    getEvents(rooms: number): RoomEvent[] {
        const enemyEvents: RoomEvent[] = Arrays.generate(Random.tupleInt(this.numEnemies),
            () => new EnemyRoomEvent(this.getEnemy()));
        const modEvents: RoomEvent[] = Arrays.generate(Random.tupleInt(this.numModifiers),
            () => new ModifierRoomEvent(this.getModifier()));
        const traitEvents: RoomEvent[] = Arrays.generate(Random.tupleInt(this.numTraits),
            () => new TraitRoomEvent(this.getTrait()));
        console.log(enemyEvents, modEvents, traitEvents)
        const events: RoomEvent[] = enemyEvents.concat(modEvents).concat(traitEvents);
        while (events.length < rooms) {
            events.push(new EmptyRoomEvent(RoomType.Empty));
        }
        console.log(events);
        return Random.shuffle(events);
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

    getEnemy(): Enemy {
        return Game.currentRun.nextEnemy(this.enemyTags);
    }

    getModifier(): Modifier {
        return Game.currentRun.nextModifier(this.modifierTags);
    }

    getTrait(): Trait {
        return Game.currentRun.nextTrait(this.traitTags);
    }

}

const floors: FloorConfig[] = [
    new FloorConfig([15, 20], [EnemyTags.level1], [3, 5], [], [3, 5], [], [2, 3])
];
