/// <reference path="Combatant.ts" />

class Enemy extends Combatant {

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    super(name, health, energy, ...tools);
  }

}
