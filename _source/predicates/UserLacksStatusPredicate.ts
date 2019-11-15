/// <reference path="../AbstractCombatPredicate.ts" />

class UserLacksStatusPredicate extends AbstractCombatPredicate {

    kind: AbstractStatus;

    constructor(kind: AbstractStatus) {
        super();
        this.kind = kind;
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return user.getStatusAmount(this.kind) == 0;
    }

    toString(): string {
        return `if you don't have ${this.kind.getName()} status`;
    }

}