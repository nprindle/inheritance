///<reference path="./Combatant.ts" />

class Player extends Combatant {

    constructor(name: string, health: number, energy: number, ...others: (Tool | Trait)[]) {
        super(name, health, energy, ...others);
    }

    clone(): Player {
        let p = new Player(this.name, this.health, this.energy, ...this.tools.map(x => x.clone()));
        p.statuses = this.statuses.map(x => x.clone());
        p.traits = this.traits.map(x => x.clone());
        return p;
    }

}
