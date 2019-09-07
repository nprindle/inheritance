///<reference path="./Combatant.ts" />

class Player extends Combatant {

  constructor(name: string, health: number, energy: number) {
    super(name, health, energy);
  }

  die(): void {

  }

}
