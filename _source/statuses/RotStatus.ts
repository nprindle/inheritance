/// <reference path="../AbstractStatus.ts" />

class RotStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    endTurn(affected: Combatant, other: Combatant) {
        affected.directDamage(this.amount);
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof RotStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof RotStatus;
    }

    clone(): RotStatus {
        return new RotStatus(this.amount);
    }

    getName(): string {
        return 'rot';
    }

    getDescription(): string {
      return `Take ${this.amount} damage at the end of every turn.`;
    }

    getSortingNumber(): number {
        return 0;
    }

    getUtility(): number {
        return -10 * this.amount;
    }

}
