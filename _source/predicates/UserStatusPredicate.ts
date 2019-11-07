/// <reference path="../AbstractCombatPredicate.ts" />

class UserStatusPredicate extends AbstractCombatPredicate {

    kind: AbstractStatus;

    constructor(threshold: number, kind: AbstractStatus) {
        super();
        this.kind = kind;
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return user.getStatusAmount(this.kind) >= this.kind.amount;
    }

    toString(): string {
        if (this.kind.amount === 1) {
            return `if you have any ${this.kind.getName()}`;
        }
        return `if you have at least ${this.kind.amount} ${this.kind.getName()}`;
    }

}