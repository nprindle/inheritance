enum CostTypes {
  Health = 'Health',
  Energy = 'Energy'
}

class Cost {
  energyCost: number;
  healthCost: number;

  constructor(...costs: [number, CostTypes]) {
    this.energyCost = 0;
    this.healthCost = 0;
    for (let i = 0; i < costs.length; i++) {
      this.addTuple(costs[i]);
    }
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

}
