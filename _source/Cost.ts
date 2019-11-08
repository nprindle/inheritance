enum CostTypes {
    Health,
    Energy,
    Battery
}

class Cost {
    energyCost: number;
    healthCost: number;
    batteryCost: number;

    constructor(...costs: [number, CostTypes][]) {
        this.energyCost = 0;
        this.healthCost = 0;
        this.batteryCost = 0;
        for (let i = 0; i < costs.length; i++) {
            this.addTuple(costs[i]);
        }
    }

    magnitude(): number {
        return this.energyCost + this.healthCost + this.batteryCost;
    }

    addTuple(cost: [number, CostTypes]): void {
        switch (cost[1]) {
            case CostTypes.Health:
                this.healthCost += cost[0];
                break;
            case CostTypes.Energy:
                this.energyCost += cost[0];
                break;
            case CostTypes.Battery:
                this.batteryCost += cost[0];
                break;
        }
    }

    toString(): string {
        let acc: string[] = [];
        if (this.energyCost > 0) {
            acc.push(`${this.energyCost} Energy`);
        }
        if (this.healthCost > 0) {
            acc.push(`${this.healthCost} Health`);
        }
        if (this.batteryCost > 0) {
            acc.push(`${this.batteryCost} Battery`);
        }
        if (acc.length === 0) {
            return 'Free';
        }
        return acc.join(', ');
    }

    addString(): string {
        let acc: string[] = [];
        if (this.energyCost > 0) {
            acc.push(`+${this.energyCost} Energy Cost`);
        }
        if (this.healthCost > 0) {
            acc.push(`+${this.healthCost} Health Cost`);
        }
        if (this.batteryCost > 0) {
            acc.push(`+${this.batteryCost} Battery Cost`);
        }
        return acc.join(', ');
    }

    scale(i: number): void {
        this.healthCost *= i;
        this.energyCost *= i;
        this.batteryCost *= i;
    }

    addCost(c: Cost): void {
        this.healthCost += c.healthCost;
        this.energyCost += c.energyCost;
        this.batteryCost += c.energyCost;
    }

    clone(): Cost {
        let c = new Cost();
        c.addCost(this);
        return c;
    }

}
