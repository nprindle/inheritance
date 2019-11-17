/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class BatteryStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof BatteryStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    runsOut(affected: Combatant, other: Combatant): void {
        affected.actuallyDie();
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant): void {
        this.amount--;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof BatteryStatus;
    }

    @override(AbstractStatus)
    clone(): BatteryStatus {
        return new BatteryStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'battery';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `If this hits zero, die instantly. Decrements by one each turn.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return this.amount * 10;
    }

}
