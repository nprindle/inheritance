///<reference path="./Combatant.ts" />

class Player extends Combatant {

    currency: number;
    extraScrip: number;

    constructor(name: string, health: number, energy: number, tools: Tool[], traits: Trait[], image?: string) {
        super(name, health, energy, tools, traits, image);
        this.currency = 0;
        this.extraScrip = 0;
    }

    giveCurrency(x: number): void {
        x = Math.max(x + this.extraScrip, 0);
        this.currency += x;
        Game.currentRun.addStatistic(RunStatistics.SCRIP_EARNED, x);
    }

    payCurrency(x: number): void {
        if (x > this.currency) {
            x = this.currency;
        }
        this.currency -= x;
        Game.currentRun.addStatistic(RunStatistics.SCRIP_SPENT, x);
    }

    clone(): Player {
        let p = new Player(this.name, this.health, this.energy, this.tools.map(x => x.clone()), this.traits.map(x => x.clone()), this.imageSrc);
        p.statuses = this.statuses.map(x => x.clone());
        p.currency = this.currency;
        p.extraScrip = this.extraScrip;
        return p;
    }

}
