/// <reference path="../AbstractEffect.ts" />

class BackfireEffect extends AbstractEffect {

    damage: number;
    constructor(damage: number) {
        super();
        this.damage = damage;
    }

    effect(user: Combatant, target: Combatant): void {
        user.wound(this.damage);
    }

    toString(): string {
        return `take ${this.damage} damage`;
    }

    clone(): BackfireEffect {
        return new BackfireEffect(this.damage);
    }

}
