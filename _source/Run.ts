/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />
/// <reference path="floors.ts" />

enum RunStatistics {
    DAMAGE_TAKEN,
    DAMAGE_DEALT,
    MODIFIERS_TAKEN,
    TRAITS_GAINED,
    SCRIP_EARNED,
    ENEMIES_FOUGHT,
    SCRIP_SPENT
}

class Run {

    player: Player;
    playerCoordinates: Coordinates;
    seenEnemies: string[];
    seenModifiers: string[];
    seenTraits: string[];
    floorNumber: number;
    currentFloor: Floor;
    statistics: Record<RunStatistics, number>;

    constructor(player: Player) {
        this.player = player;
        player.specialDamageFunction = x => this.addStatistic(RunStatistics.DAMAGE_TAKEN, x);
        this.player.setDeathFunc(() => Game.showGameOver(this));
        this.playerCoordinates = new Coordinates( { x: 0, y: 0 } );
        this.floorNumber = 0;
        this.seenEnemies = [];
        this.seenModifiers = [];
        this.seenTraits = [];
        this.statistics = [0, 0, 0, 0, 0, 0, 0];
    }

    start(): void {
        this.nextFloor();
    }

    addStatistic(statistic: RunStatistics, change: number): void {
        this.statistics[statistic] += change;
    }

    statisticString(statistic: RunStatistics): string {
        const amount: number = this.statistics[statistic];
        switch (statistic) {
            case RunStatistics.DAMAGE_DEALT:
                return `You dealt ${amount} damage.`;
            case RunStatistics.DAMAGE_TAKEN:
                return `You took ${amount} damage.`;
            case RunStatistics.ENEMIES_FOUGHT:
                return `You fought ${amount} enemies.`;
            case RunStatistics.MODIFIERS_TAKEN:
                return `You took ${amount} modifiers.`;
            case RunStatistics.TRAITS_GAINED:
                return `You gained ${amount} traits.`;
            case RunStatistics.SCRIP_EARNED:
                return `You gathered ${amount} scrip.`;
            case RunStatistics.SCRIP_SPENT:
                return `You spent ${amount} scrip.`;
        }
    }

    nextFloor(): void {
        if (this.floorNumber >= floors.length) {
            this.floorNumber %= floors.length;
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
