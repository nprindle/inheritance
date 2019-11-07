/// <reference path="../AbstractCombatPredicate.ts" />

class TargetStatusPredicate extends AbstractCombatPredicate {

    kind: AbstractStatus;

    constructor(kind: AbstractStatus) {
        super();
        this.kind = kind;
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return target.getStatusAmount(this.kind) >= this.kind.amount;
    }

    toString(): string {
        if (this.kind.amount === 1) {
            return `if your opponent has any ${this.kind.getName()}`;
        }
        return `if your opponent has at least ${this.kind.amount} ${this.kind.getName()}`;
    }

}