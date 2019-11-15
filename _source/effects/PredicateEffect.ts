/// <reference path="../AbstractEffect.ts" />
/// <reference path="../AbstractCombatPredicate.ts" />

class PredicateEffect extends AbstractEffect { //does nothing

    predicate: AbstractCombatPredicate;
    next: AbstractEffect;
    otherwise?: AbstractEffect;

    constructor(predicate: AbstractCombatPredicate, next: AbstractEffect, otherwise?: AbstractEffect) {
        super();
        this.predicate = predicate;
        this.next = next;
        this.otherwise = otherwise;
    }

    effect(user: Combatant, foe: Combatant): void {
        if (this.predicate.evaluate(user, foe)) {
            this.next.effect(user, foe);
        } else if (this.otherwise) {
            this.otherwise.effect(user, foe);
        }
    }

    toString(): string {
        if(this.otherwise != undefined) {
            return `if ${this.predicate}, ${this.next}, otherwise ${this.otherwise}`;
        } else {
            return `if ${this.predicate}, ${this.next}`;
        }
    }

    clone(): PredicateEffect {
        return new PredicateEffect(this.predicate.clone(), this.next.clone(), (this.otherwise) ? this.otherwise.clone() : undefined);
    }

}
