/// <reference path="../AbstractEffect.ts" />
/// <reference path="../ItemPool.ts" />

class GiveOtherTraitEffect extends AbstractEffect {

    trait: Trait;

    constructor(trait: Trait) {
        super();
        this.trait = trait;
        if (trait == null) {
            console.log("Null trait in trait effect");
        }
    }

    effect(user: Combatant, foe: Combatant): void {
        let foeTrait = this.trait.clone();
        foe.addTrait(foeTrait);
        foeTrait.startFight(foe);
    }

    toString(): string {
        return `give your opponent the ${this.trait.name} trait`
    }

    clone(): AbstractEffect {
        return new GiveOtherTraitEffect(this.trait.clone());
    }
}