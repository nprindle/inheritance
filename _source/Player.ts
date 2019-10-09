///<reference path="./Combatant.ts" />

class Player extends Combatant {

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    super(name, health, energy, ...tools);
  }

  clone(): Player {
    return new Player(this.name, this.health, this.energy, ...this.tools.map(x => x.clone()));
  }

}
