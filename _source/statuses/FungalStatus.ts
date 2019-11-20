/// <reference path="../AbstractStatus.ts" />
/// <reference path="PoisonStatus.ts" />

class FungalStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    takeDamage(affected: Combatant, other: Combatant) {
        other.addStatus(new PoisonStatus(this.amount));
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof FungalStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof FungalStatus;
    }

    @override(AbstractStatus)
    clone(): FungalStatus {
        return new FungalStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'fungal';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Opponent gains ${this.amount} poison whenever you take damage.`;
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
