/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />

class Run {

    player: Player;
    seenEnemies: string[];
    seenModifiers: string[];
    numEvents: number;

    constructor(player: Player) {
        this.player = player;
        this.player.setDeathFunc(() => Game.showGameOver(this));
        this.numEvents = 0;
        this.seenEnemies = [];
        this.seenModifiers = [];
    }

    start(): void {
        this.nextEvent();
    }

    nextEvent(): void {
        this.numEvents++;
        switch (this.numEvents % 2) {
            case 0:
                return this.offerModifier();
            case 1:
                return this.startFight();
        }
    }

    offerModifier(): void {
        let m = modifiers.selectRandomUnseen(this.seenModifiers);
        UI.fillScreen(UI.renderModifier(m, this.player, () => this.nextEvent()));
    }

    startFight(): void {
        let f = new Fight(this.player, enemies.selectRandomUnseen(this.seenEnemies));
        f.setEndCallback(() => this.nextEvent());
    }

}