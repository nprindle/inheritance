/// <reference path="../AbstractEffect.ts" />

class DamageEffect extends AbstractEffect {

    damage: number;
    constructor(damage: number) {
        super();
        this.damage = damage;
    }

    effect(user: Combatant, target: Combatant): void {
        let oldHealth = target.health;
        target.wound(user.statusFold(StatusFolds.DAMAGE_DEALT, this.damage));
        if (user instanceof Player) {
            Game.currentRun.addStatistic(RunStatistics.DAMAGE_DEALT, oldHealth - target.health);
        }
    }

    toString(): string {
        return `do ${this.damage} damage`;
    }

    clone(): DamageEffect {
        return new DamageEffect(this.damage);
    }

}
