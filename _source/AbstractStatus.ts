/// <reference path="Combatant.ts" />

enum StatusCallbacks {
    START_TURN = 'startTurn',
    END_TURN = 'endTurn',
    USE_TOOL = 'useTool',
    TAKE_DAMAGE = 'takeDamage',
    DIE = 'die',
    //there's no callback for runsOut since that shouldn't be called over all functions
}

enum StatusFolds {
    DAMAGE_TAKEN = 'damageTakenFold',
    DAMAGE_DEALT = 'damageDealtFold',
    AMOUNT_HEALED = 'amountHealedFold',
    ENERGY_GAINED = 'energyGainedFold'
}

enum StatusValidators {
    NONZERO,
    POSITIVE
}

abstract class AbstractStatus {

    amount: number;
    validator: StatusValidators;

    constructor(amount: number, validator: StatusValidators) {
        this.amount = amount;
        this.validator = validator;
    }

    //A lot of the methods here have the parameters "affected" and "other." The affected is the one with the status effect, and the other is their opponent.

    //Called at the start the affected's turn.
    startTurn(affected: Combatant, other: Combatant): void {

    }

    //Called at the end of the affected's turn.
    //If the status decrements itself in some way, this is where that should go.
    endTurn(affected: Combatant, other: Combatant): void {

    }

    //Called whenever the affected uses a tool.
    useTool(affected: Combatant, other: Combatant): void {

    }

    //Called whenever the affected takes damage.
    takeDamage(affected: Combatant, other: Combatant): void {

    }

    //Called whenever the affected dies.
    die(affected: Combatant, other: Combatant): void {

    }

    //Called whenever the affected loses this status.
    runsOut(affected: Combatant, other: Combatant): void {

    }

    //These functions are used for reducing over certain values - damage taken, amount healed, etc.

    damageTakenFold(acc: number): number {
        return acc;
    }

    damageDealtFold(acc: number): number {
        return acc;
    }

    amountHealedFold(acc: number): number {
        return acc;
    }

    energyGainedFold(acc: number): number {
        return acc;
    }

    // Overrides an enemy's utility function to change its AI behavior
    // This method is optional; status effects that don't change AI behavior should not implement it
    overridenUtilityFunction?(bot: Enemy, human: Player): number;


    //This method tries to add some other status to this status. It's important to get this right!
    //This should return false if the add hasn't been completed and true if it has.
    abstract add(other: AbstractStatus): boolean;

    abstract clone(): AbstractStatus;

    //Accessing static members is difficult.
    abstract getName(): string;
    abstract getDescription(): string;
    abstract getSortingNumber(): number;
    abstract getUtility(): number;

    //Type comparisons are hard.
    abstract sameKind(other: AbstractStatus): boolean;

    isValid(): boolean {
        switch (this.validator) {
            case StatusValidators.NONZERO:
                return this.amount !== 0;
            case StatusValidators.POSITIVE:
                return this.amount > 0;
        }
    }

    toString(): string {
        return `${this.amount} ${Strings.capitalize(this.getName())}`
    }

}
