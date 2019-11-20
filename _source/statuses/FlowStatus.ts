/// <reference path="../AbstractStatus.ts" />

class FlowStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    takeDamage(affected: Combatant, other: Combatant) {
        this.amount--;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof FlowStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof FlowStatus;
    }

    @override(AbstractStatus)
    clone(): FlowStatus {
        return new FlowStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'flow';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Used for combos. Decreases whenever you take damage.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return this.amount;
    }

}
