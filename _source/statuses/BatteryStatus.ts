/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class BatteryStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof BatteryStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    runsOut(affected: Combatant, other: Combatant): void {
        affected.actuallyDie();
    }

    endTurn(affected: Combatant): void {
        this.amount--;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof BatteryStatus;
    }

    clone(): BatteryStatus {
        return new BatteryStatus(this.amount);
    }

    getName(): string {
        return 'battery';
    }

    getDescription(): string {
        return `If this hits zero, die instantly. Decrements by one each turn.`;
    }

    getSortingNumber(): number {
        return 10;
    }

    getUtility(): number {
        return this.amount * 10;
    }

}
