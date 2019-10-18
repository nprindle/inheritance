/// <reference path="../AbstractStatus.ts" />

class BurnStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    useTool(affected: Combatant, other: Combatant) {
        affected.directDamage(this.amount);
    }

    endTurn(affected: Combatant, other: Combatant) {
        this.amount = 0;
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof BurnStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    clone(): BurnStatus {
        return new BurnStatus(this.amount);
    }

    getName(): string {
        return 'burn';
    }

    getSortingNumber(): number {
        return 0;
    }

}