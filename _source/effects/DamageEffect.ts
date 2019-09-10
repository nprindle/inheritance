// <reference path="../AbstractEffect.ts" />

class DamageEffect extends AbstractEffect {

  damage: number;
  constructor(damage: number) {
    super();
    this.damage = damage;
  }

  effect(user: Combatant, target: Combatant): void {
    target.wound(this.damage);
  }

}
