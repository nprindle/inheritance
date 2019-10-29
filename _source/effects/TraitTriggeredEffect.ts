/// <reference path="../AbstractEffect.ts" />

class TraitTriggeredEffect extends AbstractEffect {

    next: AbstractEffect;

    constructor(next: AbstractEffect) {
        super();
        this.next = next;
    }

    effect(user: Combatant, target: Combatant): void {
        let repeat = user.traits.length;
        for (let i = 0; i < repeat; i++) {
            this.next.effect(user, target);
        }
    }

    toString(): string {
        return `${this.next.toString()} for every trait you have`;
    }

    clone(): TraitTriggeredEffect {
        return new TraitTriggeredEffect(this.next.clone());
    }

}
