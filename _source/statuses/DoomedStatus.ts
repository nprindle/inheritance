/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class DoomedStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof DoomedStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant): void {
        this.amount--;
        if (this.amount === 0) {
            affected.actuallyDie();
        }
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof DoomedStatus;
    }

    @override(AbstractStatus)
    clone(): DoomedStatus {
        return new DoomedStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'doomed';
    }

    @override(AbstractStatus)
    getDescription(): string {
        if (this.amount === 1) {
            return `Die at the end of this turn.`;
        }
        return `Die in ${this.amount} turns.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        //TODO: make this more accurate
        return -100 * Math.pow(2, -this.amount);
    }

}
