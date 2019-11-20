/// <reference path="../AbstractEffect.ts" />
/// <reference path="../AbstractStatus.ts" />

class ChangeUserNegativeStatuses extends AbstractEffect {

    amount: number;
    constructor(amount: number) {
        super();
        this.amount = amount;
    }

    effect(user: Combatant, target: Combatant): void {
        let badStatuses: AbstractStatus[] = user.statuses.filter(status => status.getUtility() < 0).map(status => status.clone())
        badStatuses.forEach(status => {
            status.amount = this.amount;
            user.addStatus(status);
        });
    }

    toString(): string {
        if (this.amount < 0) {
            return `decrease all your negative statuses by ${Math.abs(this.amount)}`;
        } else {
            return `increase all your negative statuses by ${this.amount}`;
        }
    }

    clone(): ChangeUserNegativeStatuses {
        return new ChangeUserNegativeStatuses(this.amount);
    }

}
