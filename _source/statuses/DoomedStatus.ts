/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class DoomedStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof DoomedStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    endTurn(affected: Combatant): void {
        this.amount--;
        if (this.amount === 0) {
            affected.actuallyDie();
        }
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof DoomedStatus;
    }

    clone(): DoomedStatus {
        return new DoomedStatus(this.amount);
    }

    getName(): string {
        return 'doomed';
    }

    getDescription(): string {
        if (this.amount === 1) {
            return `Die at the end of this turn.`;
        }
        return `Die in ${this.amount} turns.`;
    }

    getSortingNumber(): number {
        return 10;
    }

    getUtility(): number {
        //TODO: make this more accurate
        return -100 * Math.pow(2, -this.amount);
    }

}
