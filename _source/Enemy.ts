/// <reference path="Combatant.ts" />
/// <reference path="Random.ts" />

class Enemy extends Combatant {

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    super(name, health, energy, ...tools);
  }

  think(target: Combatant): number {
    let moves = this.validMoves();
    return Random.fromArray(moves);
  }

}
