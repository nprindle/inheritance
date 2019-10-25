/// <reference path="map/RoomType.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="Random.ts" />

class FloorConfig {

    numRooms: [number, number];
    emptyWeight: number;

    enemyTags: EnemyTags[];
    enemyWeight: number;

    modifierTags: ModifierTags[];
    modifierWeight: number;

    traitTags: TraitTags[];
    traitWeight: number;

    constructor(minRooms: number, maxRooms: number, emptyWeight: number, enemyTags: EnemyTags[], enemyWeight: number, modifierTags: ModifierTags[], modifierWeight: number, traitTags: TraitTags[], traitWeight: number) {
        this.numRooms = [minRooms, maxRooms];
        this.emptyWeight = emptyWeight;
        this.enemyTags = enemyTags;
        this.enemyWeight = enemyWeight;
        this.modifierTags = modifierTags;
        this.modifierWeight = modifierWeight;
        this.traitTags = traitTags;
        this.traitWeight = traitWeight;
    }

    getNumRooms(): number {
        return Random.intBetween(this.numRooms[0], this.numRooms[1]);
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

    getRoomType(): RoomType {
        return Random.weightedRandom([
            [RoomType.Empty, this.emptyWeight],
            [RoomType.Enemy, this.enemyWeight],
            [RoomType.Modifier, this.modifierWeight],
            [RoomType.Trait, this.traitWeight],
        ]) as RoomType;
    }

}

const floors: FloorConfig[] = [
    new FloorConfig(15, 20, 1, [EnemyTags.level1], 2, [], 2, [], 2)
];
