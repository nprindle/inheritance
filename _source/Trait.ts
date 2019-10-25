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

  clone(): Trait {
    return new Trait(this.name, ...this.appliedStatuses.map(x => x.clone()));
  }

}
