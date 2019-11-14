/// <reference path="../AbstractEffect.ts" />

class LeechEffect extends AbstractEffect {

    damage: number;
    constructor(damage: number) {
        super();
        this.damage = damage;
    }

    effect(user: Combatant, target: Combatant): void {
        let oldHealth: number = target.health;
        target.wound(user.statusFold(StatusFolds.DAMAGE_DEALT, this.damage));
        user.heal(oldHealth - target.health);
    }

    toString(): string {
        return `do ${this.damage} damage and heal equal to damage dealt`;
    }

    clone(): LeechEffect {
        return new LeechEffect(this.damage);
    }

}
