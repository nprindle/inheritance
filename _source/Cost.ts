enum CostTypes {
  Health = 'Health',
  Energy = 'Energy'
}

class Cost {
  energyCost: number;
  healthCost: number;

  constructor(...costs: [number, CostTypes][]) {
    this.energyCost = 0;
    this.healthCost = 0;
    for (let i = 0; i < costs.length; i++) {
      this.addTuple(costs[i]);
    }
  }

  magnitude(): number {
    return this.energyCost + this.healthCost;
  }

  addTuple(cost: [number, CostTypes]): void {
    switch (cost[1]) {
      case CostTypes.Health:
        this.healthCost += cost[0];
        break;
      case CostTypes.Energy:
        this.energyCost += cost[0];
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
    return acc.join(', ');
  }

  scale(i: number): void {
    this.healthCost *= i;
    this.energyCost *= i;
  }

  addCost(c: Cost): void {
    this.healthCost += c.healthCost;
    this.energyCost += c.energyCost;
  }

  clone(): Cost {
    let c = new Cost();
    c.addCost(this);
    return c;
  }

}
