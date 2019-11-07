/// <reference path="../AbstractEffect.ts" />

class HalveMaxHealthEffect extends AbstractEffect {

    constructor() {
        super();
    }

    effect(user: Combatant, target: Combatant): void {
        user.decreaseMaxHealth(Math.floor(user.maxHealth / 2));
    }

    toString(): string {
        return `halve your maximum health`;
    }

    clone(): HalveMaxHealthEffect {
        return new HalveMaxHealthEffect();
    }

}
