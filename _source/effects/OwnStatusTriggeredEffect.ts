/// <reference path="../AbstractEffect.ts" />

class OwnStatusTriggeredEffect extends AbstractEffect {

    status: AbstractStatus;
    next: AbstractEffect;
    constructor(status: AbstractStatus, next: AbstractEffect) {
        super();
        this.status = status;
        this.next = next;
    }

    effect(user: Combatant, target: Combatant): void {
        let repeat = user.getStatusAmount(this.status);
        for (let i = 0; i < repeat; i++) {
            this.next.effect(user, target);
        }
    }

    toString(): string {
        return `${this.next.toString()} for each ${Strings.capitalize(this.status.getName())} you have`;
    }

    clone(): OwnStatusTriggeredEffect {
        return new OwnStatusTriggeredEffect(this.status.clone(), this.next.clone());
    }

}
