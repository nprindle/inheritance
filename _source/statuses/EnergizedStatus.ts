/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class EnergizedStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    startTurn(affected: Combatant, other: Combatant) {
        affected.energy += this.amount; //otherwise it can get eaten by energy debt
    }

    endTurn(affected: Combatant, other: Combatant) {
        this.amount = 0;
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof EnergizedStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof EnergizedStatus;
    }

    clone(): EnergizedStatus {
        return new EnergizedStatus(this.amount);
    }

    getName(): string {
        return 'energized';
    }

    getDescription(): string {
        return `Start with ${this.amount} extra damage this turn.`;
    }

    getSortingNumber(): number {
        return 9;
    }

    getUtility(): number {
        return 2 * this.amount;
    }

}
