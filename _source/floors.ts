/// <reference path="map/RoomType.ts" />
/// <reference path="map/RoomEvent.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="Random.ts" />

class FloorConfig {

    name: string;

    numRooms: [number, number];

    enemyTags: EnemyTags[];
    numEnemies: [number, number];

    modifierTags: ModifierTags[];
    numModifiers: [number, number];

    traitTags: TraitTags[];
    numTraits: [number, number];

    constructor(params: { name: string; numRooms: [number, number]; enemyTags: EnemyTags[]; numEnemies: [number, number]; modifierTags: ModifierTags[]; numModifiers: [number, number]; traitTags: TraitTags[]; numTraits: [number, number] }) {
        this.name = params.name;
        this.numRooms = params.numRooms;
        this.enemyTags = params.enemyTags;
        this.numEnemies = params.numEnemies;
        this.modifierTags = params.modifierTags;
        this.numModifiers = params.numModifiers;
        this.traitTags = params.traitTags;
        this.numTraits = params.numTraits;
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
    new FloorConfig({
        name: "The Foyer",
        numRooms: [10, 15],
        enemyTags: [EnemyTags.level1],
        numEnemies: [2, 4],
        modifierTags: [],
        numModifiers: [2, 4],
        traitTags: [TraitTags.standard],
        numTraits: [1, 2],
    })
];
