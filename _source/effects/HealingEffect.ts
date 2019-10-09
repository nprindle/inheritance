// <reference path="../AbstractEffect.ts" />

class HealingEffect extends AbstractEffect {

  amount: number;
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  effect(user: Combatant, target: Combatant): void {
    user.heal(this.amount);
  }

  toString(): string {
    return `recover ${this.amount} health`;
  }

  clone(): HealingEffect {
    return new HealingEffect(this.amount);
  }

}
