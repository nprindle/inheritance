/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class CountDownStatus extends AbstractStatus {

    damage: number;

    constructor(amount: number, damage: number) {
        super(amount, StatusValidators.POSITIVE);
        this.damage = damage;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof CountDownStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    runsOut(user: Combatant, target: Combatant): void {
        
        target.wound(this.damage);

        // if the target is still alive, the dies
        if (target.health > 0) {
            user.actuallyDie();
        }
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant): void {
        this.amount--;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof BatteryStatus;
    }

    @override(AbstractStatus)
    clone(): CountDownStatus {
        return new CountDownStatus(this.amount, this.damage);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'countdown';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `If this hits zero, self-destruct and deal ${this.damage} damage`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        if (this.amount > 0) {
            return 100 / this.amount;
        }
    }
}
