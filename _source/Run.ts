/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />

class Run {

    player: Player;
    playerCoordinates: Coordinates;
    seenEnemies: string[];
    seenModifiers: string[];
    seenTraits: string[];
    numEvents: number;
    currentFloor: Floor;

    constructor(player: Player) {
        this.player = player;
        this.player.setDeathFunc(() => Game.showGameOver(this));
        this.playerCoordinates = new Coordinates( { x: 0, y: 0 } );
        this.numEvents = 0;
        this.seenEnemies = [];
        this.seenModifiers = [];
        this.seenTraits = [];
    }

    start(): void {
        this.nextEvent();
    }

    nextEvent(): void {
        this.numEvents++;
        this.currentFloor = new Floor(0, this);
        this.playerCoordinates = this.currentFloor.entranceRoom.coordinates;
        this.currentFloor.redraw();
        // switch (this.numEvents % 2) {
        //     case 0:
        //         return this.offerModifier();
        //     case 1:
        //         return this.startFight();
        // }
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

    offerModifier(): void {
        // TODO: don't do an unsafe assertion here
        let m = modifiers.selectRandomUnseen(this.seenModifiers)!;
        UI.fillScreen(UI.renderModifier(m, this.player, () => this.nextEvent()));
    }

    startFight(): void {
        // TODO: don't do an unsafe assertion here
        let enemy = enemies.selectRandomUnseen(this.seenEnemies)!;
        let f = new Fight(this.player, enemy);
        f.setEndCallback(() => this.nextEvent());
    }

    movePlayer(coords: Coordinates): void {
        this.playerCoordinates = coords;
    }

}
