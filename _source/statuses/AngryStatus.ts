/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class AngryStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        this.amount--;
    }

    @override(AbstractStatus)
    overridenUtilityFunction(bot: Enemy, human: Player) {
        return AiUtilityFunctions.aggressiveUtility(bot, human);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof AngryStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof AngryStatus;
    }

    @override(AbstractStatus)
    clone(): AngryStatus {
        return new AngryStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'angry';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return 'Prefers aggression. Decreases by one each turn.';
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -1 * this.amount;
    }

}
