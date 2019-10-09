/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />

class Run {

    player: Player;

    constructor(player: Player) {
        this.player = player;
        this.player.setDeathFunc(() => Game.showGameOver(this));
    }

    start(): void {
        this.startFight();
    }

    startFight(): void {
        let f = new Fight(this.player, new Enemy('Goldfish', 10, 10, new Tool('Violent Splash', new Cost([1, CostTypes.Energy]), new DamageEffect(10))));
        f.setEndCallback(() => this.startFight());
    }

}