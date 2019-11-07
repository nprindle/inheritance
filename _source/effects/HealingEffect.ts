/// <reference path="../AbstractEffect.ts" />

class HealingEffect extends AbstractEffect {

    amount: number;
    constructor(amount: number) {
        super();
        this.amount = amount;
    }

    effect(user: Combatant, target: Combatant): void {
        if (this.amount === -1) {
            user.heal(user.maxHealth);
        } else {
            user.heal(this.amount);
        }
    }

    toString(): string {
        if (this.amount === -1) {
            return `recover all health`;
        }
        return `recover ${this.amount} health`;
    }

    clone(): HealingEffect {
        return new HealingEffect(this.amount);
    }

}
