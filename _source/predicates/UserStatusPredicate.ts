/// <reference path="../AbstractCombatPredicate.ts" />

class UserStatusPredicate extends AbstractCombatPredicate {

    threshold: number;
    kind: AbstractStatus;

    constructor(threshold: number, kind: AbstractStatus) {
        super();
        this.threshold = threshold;
        this.kind = kind;
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return user.getStatusAmount(this.kind) >= this.threshold;
    }

    toString(): string {
        if (this.threshold === 1) {
            return `if you have any ${this.kind.getName()}`;
        }
        return `if you have at least ${this.threshold} ${this.kind.getName()}`;
    }

}