/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />

class Run {

    player: Player;
    seenEnemies: string[];
    seenModifiers: string[];

    constructor(player: Player) {
        this.player = player;
        this.player.setDeathFunc(() => Game.showGameOver(this));
        this.seenEnemies = [];
        this.seenModifiers = [];
    }

    start(): void {
        this.startFight();
    }

    startFight(): void {
        let f = new Fight(this.player, enemies.selectRandomUnseen(this.seenEnemies));
        f.setEndCallback(() => this.startFight());
    }

}