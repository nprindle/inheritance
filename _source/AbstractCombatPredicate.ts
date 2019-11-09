/// <reference path="Combatant.ts" />
abstract class AbstractCombatPredicate {

    abstract toString(): string;
    abstract evaluate(target: Combatant, other: Combatant): boolean;

    clone(): AbstractCombatPredicate {
        return this;
    }

}
