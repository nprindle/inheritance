/// <reference path="AbstractStatus.ts" />
/// <reference path="Combatant.ts" />

class Trait {

  name: string;
  appliedStatuses: AbstractStatus[];

  constructor(name: string, ...statuses: AbstractStatus[]) {
    this.name = name;
    this.appliedStatuses = statuses;
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
    return new Trait(this.name, ...this.appliedStatuses.map(x => x.clone()));
  }

  describe(): string {
    return `Start fights with ${this.appliedStatuses.map(x => x.toString()).join(', ')}`;
  }

}
