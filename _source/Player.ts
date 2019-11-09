///<reference path="./Combatant.ts" />

class Player extends Combatant {

    currency: number;

    constructor(name: string, health: number, energy: number, tools: Tool[], traits: Trait[]) {
        super(name, health, energy, tools, traits);
        this.currency = 0;
    }

    giveCurrency(x: number): void {
        this.currency += x;
    }

    payCurrency(x: number): void {
        this.currency = Math.max(0, this.currency - x);
    }

    clone(): Player {
        let p = new Player(this.name, this.health, this.energy, this.tools.map(x => x.clone()), this.traits.map(x => x.clone()));
        p.statuses = this.statuses.map(x => x.clone());
        p.currency = this.currency;
        return p;
    }

}
