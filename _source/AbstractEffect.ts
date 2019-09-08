abstract class AbstractEffect {
  next: AbstractEffect | null;
  abstract activate(user: Combatant, target: Combatant): void;
}

class NothingEffect extends AbstractEffect { //does nothing
  activate(user: Combatant, target: Combatant): void {
    return;
  }
}
