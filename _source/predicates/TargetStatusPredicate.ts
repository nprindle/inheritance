/// <reference path="../AbstractCombatPredicate.ts" />

class TargetStatusPredicate extends AbstractCombatPredicate {

    threshold: number;
    kind: AbstractStatus;

    constructor(threshold: number, kind: AbstractStatus) {
        super();
        this.threshold = threshold;
        this.kind = kind;
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return target.getStatusAmount(this.kind) >= this.threshold;
    }

    toString(): string {
        if (this.threshold === 1) {
            return `if your opponent has any ${this.kind.getName()}`;
        }
        return `if your opponent has at least ${this.threshold} ${this.kind.getName()}`;
    }

}