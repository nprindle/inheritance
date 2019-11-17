/// <reference path="../AbstractCombatPredicate.ts" />

class UserStatusPredicate extends AbstractCombatPredicate {

    kind: AbstractStatus;

    constructor(kind: AbstractStatus) {
        super();
        this.kind = kind;
    }

    evaluate(user: Combatant, target: Combatant): boolean {
        return user.getStatusAmount(this.kind) >= this.kind.amount;
    }

    toString(): string {
        if (this.kind.amount === 1) {
            return `you have any ${Strings.capitalize(this.kind.getName())}`;
        }
        return `you have at least ${this.kind.amount} ${Strings.capitalize(this.kind.getName())}`;
    }

}