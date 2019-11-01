/// <reference path="../AbstractStatus.ts" />

class DefenseStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.NONZERO);
    }

    damageTakenFold(acc: number): number {
        return Math.max(0, acc + this.amount);
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof DefenseStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof DefenseStatus;
    }

    clone(): DefenseStatus {
        return new DefenseStatus(this.amount);
    }

    getName(): string {
        return 'defense';
    }

    getDescription(): string {
        if (this.amount > 0) {
            return `Take ${this.amount} less damage from attacks.`;
        } else {
            return `Take ${Math.abs(this.amount)} more damage from attacks.`;
        }
    }

    getSortingNumber(): number {
        return 0;
    }

    getUtility(): number {
        return 2 * this.amount;
    }

}