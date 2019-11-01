/// <reference path="../AbstractStatus.ts" />
/// <reference path="PoisonStatus.ts" />

class FungalStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    takeDamage(affected: Combatant, other: Combatant) {
        other.addStatus(new PoisonStatus(this.amount));
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof FungalStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof FungalStatus;
    }

    clone(): FungalStatus {
        return new FungalStatus(this.amount);
    }

    getName(): string {
        return 'fungal';
    }

    getDescription(): string {
        return `Opponent gains ${this.amount} poison whenever you take damage.`;
    }

    getSortingNumber(): number {
        return 0;
    }

    getUtility(): number {
        return this.amount;
    }

}