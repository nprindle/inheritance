/// <reference path="../AbstractEffect.ts" />

class PayWithRandomTraitEffect extends AbstractEffect {

    next: AbstractEffect;

    constructor(next: AbstractEffect) {
        super();
        this.next = next;
    }

    effect(user: Combatant, target: Combatant): void {
        if (user.traits.length === 0) {
            return;
        }
        let index = Random.intLessThan(user.traits.length);
        user.removeTrait(index);
        this.next.effect(user, target);
    }

    toString(): string {
        return `lose a random trait to ${this.next.toString()}`;
    }

    clone(): PayWithRandomTraitEffect {
        return new PayWithRandomTraitEffect(this.next.clone());
    }

}
