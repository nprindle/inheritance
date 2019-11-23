/// <reference path="../AbstractEffect.ts" />

class CombinationEffect extends AbstractEffect { //combine multiple effects

    effects: AbstractEffect[];

    constructor(...effects: AbstractEffect[]) {
        super();
        this.effects = effects;
    }

    effect(user: Combatant, foe: Combatant): void {
        for (let effect of this.effects) {
            effect.activate(user, foe);
        }
    }

    toString(): string {
        let acc = [];
        for (let effect of this.effects) {
            acc.push(effect.toString());
        }
        return acc.join(' and ');
    }

    clone(): CombinationEffect {
        return new CombinationEffect(...this.effects.map(x => x.clone()));
    }

}
