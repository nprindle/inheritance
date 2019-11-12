/// <reference path="../AbstractStatus.ts" />

class RotStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        affected.directDamage(this.amount);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof RotStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof RotStatus;
    }

    @override(AbstractStatus)
    clone(): RotStatus {
        return new RotStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'rot';
    }

    @override(AbstractStatus)
    getDescription(): string {
      return `Take ${this.amount} damage at the end of every turn.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -10 * this.amount;
    }

}
