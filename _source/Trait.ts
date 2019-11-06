/// <reference path="AbstractStatus.ts" />
/// <reference path="Combatant.ts" />

abstract class TraitMod {
    abstract apply(c: Combatant): void;
    abstract remove(c: Combatant): void;
    abstract toString(): string;
}

class GiveHealth extends TraitMod {
    amount: number;

    constructor(n: number) {
        super();
        this.amount = n;
    }

    apply(c: Combatant): void {
        c.increaseMaxHealth(this.amount);
    }

    remove(c: Combatant): void {
        c.decreaseMaxHealth(this.amount);
    }

    toString(): string {
        return `increase max health by ${this.amount}`;
    }

}

class Trait {

    name: string;
    appliedStatuses: AbstractStatus[];
    traitMods: TraitMod[];

    constructor(name: string, ...mods: (AbstractStatus | TraitMod)[]) {
        this.name = name;
        this.appliedStatuses = <AbstractStatus[]> mods.filter(x => x instanceof AbstractStatus);
        this.traitMods = <TraitMod[]> mods.filter(x => x instanceof TraitMod);
    }

    apply(c: Combatant): void {
        this.traitMods.forEach(tm => tm.apply(c));
    }

    remove(c: Combatant): void {
        this.traitMods.forEach(tm => tm.remove(c));
    }

    startFight(c: Combatant): void {
        const statusClones = this.appliedStatuses.map(x => x.clone());
        statusClones.forEach(status => c.addStatus(status));
    }

    removeEffects(c: Combatant): void {
        const statusClones = this.appliedStatuses.map(x => x.clone());
        statusClones.forEach(status => status.amount *= -1);
        statusClones.forEach(status => c.addStatus(status));
    }

    clone(): Trait {
        let t: Trait = new Trait(this.name, ...this.appliedStatuses.map(x => x.clone()));
        t.traitMods = this.traitMods;
        return t;
    }

    describe(): string {
        let acc: string[] = this.traitMods.map(tm => tm.toString());
        if (this.appliedStatuses.length > 0) {
            acc.push(`start fights with ${this.appliedStatuses.map(x => x.toString()).join(', ')}`);
        }
        return Strings.conjoin(acc);
    }

}
