/// <reference path="../AbstractStatus.ts" />

class StrengthStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.NONZERO);
    }

    @override(AbstractStatus)
    damageDealtFold(acc: number): number {
        return Math.max(1, acc + this.amount);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof StrengthStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof StrengthStatus;
    }

    @override(AbstractStatus)
    clone(): StrengthStatus {
        return new StrengthStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'strength';
    }

    @override(AbstractStatus)
    getDescription(): string {
        if (this.amount > 0) {
            return `Deal ${this.amount} more damage whenever you attack.`;
        } else {
            return `Deal ${Math.abs(this.amount)} less damage whenever you attack.`;
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
