/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />
/// <reference path="floors.ts" />

class Run {

    player: Player;
    playerCoordinates: Coordinates;
    seenEnemies: string[];
    seenModifiers: string[];
    seenTraits: string[];
    floorNumber: number;
    currentFloor: Floor;

    constructor(player: Player) {
        this.player = player;
        this.player.setDeathFunc(() => Game.showGameOver(this));
        this.playerCoordinates = new Coordinates( { x: 0, y: 0 } );
        this.floorNumber = 0;
        this.seenEnemies = [];
        this.seenModifiers = [];
        this.seenTraits = [];
    }

    start(): void {
        this.nextFloor();
    }

    nextFloor(): void {
        if (this.floorNumber >= floors.length) {
            this.floorNumber %= floors.length; //TODO: make getting to the end win the game
        }
        this.currentFloor = new Floor(this.floorNumber, this);
        this.playerCoordinates = this.currentFloor.entranceRoom.coordinates;
        this.currentFloor.redraw();
        UI.announce(this.currentFloor.floorName);
        this.currentFloor.entranceRoom.enter();
        this.floorNumber++;
    }

    nextModifier(...tagSets: ModifierTags[][]): Modifier {
        return modifiers.selectRandomUnseen(this.seenModifiers, ...tagSets)!;
    }

    nextEnemy(...tagSets: EnemyTags[][]): Enemy {
        return enemies.selectRandomUnseen(this.seenEnemies, ...tagSets)!;
    }

    nextTrait(...tagSets: TraitTags[][]): Trait {
      return traits.selectRandomUnseen(this.seenTraits, ...tagSets);
    }

    movePlayer(coords: Coordinates): void {
        this.playerCoordinates = coords;
    }

}
