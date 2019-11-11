/// <reference path="../AbstractStatus.ts" />

class DefenseStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.NONZERO);
    }

    @override(AbstractStatus)
    damageTakenFold(acc: number): number {
        return Math.max(0, acc + this.amount);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof DefenseStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof DefenseStatus;
    }

    @override(AbstractStatus)
    clone(): DefenseStatus {
        return new DefenseStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'defense';
    }

    @override(AbstractStatus)
    getDescription(): string {
        if (this.amount > 0) {
            return `Take ${this.amount} less damage from attacks.`;
        } else {
            return `Take ${Math.abs(this.amount)} more damage from attacks.`;
        }
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return 2 * this.amount;
    }

}
