/// <reference path="Combatant.ts" />
/// <reference path="Random.ts" />

class Enemy extends Combatant {

    lootTraits: Trait[];
    lootModifiers: Modifier[];

    utilityFunction: (Enemy, Player) => number;

    constructor(name: string, health: number, energy: number, defaultUtilityFunction: (Enemy, Human) => number, ...others: (Tool | Trait)[]) {
        super(name, health, energy, ...others);
        if (defaultUtilityFunction == undefined) {
            this.utilityFunction = AiUtilityFunctions.cautiousUtility;
        } else {
            this.utilityFunction = defaultUtilityFunction;
        }
        this.lootTraits = [];
        this.lootModifiers = [];
    }

    clone(): Enemy {
        let others: (Tool | Trait)[] = [...this.tools, ...this.traits];
        let copy = new Enemy(this.name, this.health, this.energy, this.utilityFunction, ...others.map(x => x.clone()));
        copy.statuses = this.statuses.map(x => x.clone());
        copy.utilityFunction = this.utilityFunction;
        return copy;
    }

    addLootTrait(t: Trait): void {
        this.addTrait(t);
        this.lootTraits.push(t);
    }

    addLootModifier(m: Modifier): void {
        let tool: Tool = Random.fromArray(this.tools);
        m.apply(tool);
        this.lootModifiers.push(m);
    }

}
