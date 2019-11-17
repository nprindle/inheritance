/// <reference path="../AbstractCombatPredicate.ts" />

class TargetDeadPredicate extends AbstractCombatPredicate {

    constructor() {
        super();
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return target.health <= 0;
    }

    toString(): string {
        return `your opponent is dead`;
    }

}