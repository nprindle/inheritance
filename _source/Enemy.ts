/// <reference path="Combatant.ts" />
/// <reference path="Random.ts" />

class Enemy extends Combatant {

    lootTraits: Trait[];
    lootModifiers: Modifier[];
    lootMoney: number;

    utilityFunction: (Enemy, Player) => number;

    constructor(name: string, health: number, energy: number, defaultUtilityFunction: (Enemy, Human) => number, tools: Tool[], traits: Trait[], image?: string) {
        super(name, health, energy, tools, traits, image);
        if (defaultUtilityFunction == undefined) {
            this.utilityFunction = AiUtilityFunctions.cautiousUtility;
        } else {
            this.utilityFunction = defaultUtilityFunction;
        }
        this.lootTraits = [];
        this.lootModifiers = [];
        this.lootMoney = 0;
    }

    clone(): Enemy {
        let copy = new Enemy(this.name, this.health, this.energy, this.utilityFunction, this.tools.map(x => x.clone()), this.traits.map(x => x.clone()), this.imageSrc);
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

    setLootMoney(x: number): void {
        this.lootMoney = x;
    }

}
