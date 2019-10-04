/// <reference path="Combatant.ts" />
/// <reference path="Random.ts" />

class Enemy extends Combatant {

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    super(name, health, energy, ...tools);
  }

  think(target: Combatant): number {
    let moves = this.validMoves();
    if (moves.length === 0) {
      return -1;
    }
    return Random.fromArray(moves);
  }

  clone(): Enemy {
    return new Enemy(this.name, this.health, this.energy, ...this.tools.map(x => x.clone()));
  }

}
