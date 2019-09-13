class UI {

  static redrawFunction: Function;

  static makeDiv(c?: string, id?: string) {
    const div: HTMLElement = document.createElement('div');
    if (c) {
      div.classList.add(c);
    }
    if (id) {
      div.id = id;
    }
    return div;
  }

  static makeTextParagraph(str: string, c?: string, id?: string): HTMLElement {
    const p: HTMLElement = document.createElement('p');
    p.innerText = str;
    if (c) {
      p.classList.add(c);
    }
    if (id) {
      p.id = id;
    }
    return p;
  }

  static makeButton(str: string, func: Function, disabled: boolean, c?: string, id?: string): HTMLButtonElement {
    const b: HTMLButtonElement = document.createElement('button');
    b.type = 'button';
    b.disabled = disabled;
    b.innerText = str;
    if (c) {
      b.classList.add(c);
    }
    if (id) {
      b.id = id;
    }
    b.addEventListener('click', function (this: HTMLElement, ev: MouseEvent) {
      func.call(this, ev);
    });
    return b;
  }

  static renderCombatant(c: Combatant, target: Combatant, isTurn: boolean): HTMLElement {
    let which;
    if (c instanceof Player) {
      which = 'player';
    } else {
      which = 'enemy';
    }
    const div: HTMLElement = UI.makeDiv(which);
    div.appendChild(UI.makeTextParagraph(c.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Health: ${c.health} / ${c.maxHealth}`, 'health'));
    div.appendChild(UI.makeTextParagraph(`Energy: ${c.energy} / ${c.maxEnergy}`, 'energy'));
    const toolDiv: HTMLElement = document.createElement('div');
    toolDiv.classList.add('tools');
    for (let i = 0; i < c.tools.length; i++) {
      let currentDiv: HTMLElement = UI.renderCombatTool(c.tools[i], c, i, target, isTurn);
      currentDiv.classList.add(`tool_${i}`);
      toolDiv.appendChild(currentDiv);
    }
    div.appendChild(toolDiv);
    return div;
  }

  static renderCombatTool(t: Tool, c?: Combatant, i?: number, target?: Combatant, isTurn?: boolean) {
    const div: HTMLElement = UI.makeDiv('tool');
    div.appendChild(UI.makeTextParagraph(t.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Cost: ${t.cost.toString()}`, 'name'));
    div.appendChild(UI.makeTextParagraph(t.effectsString(), 'effect'));
    if (p && i !== undefined) {
      div.appendChild(UI.makeButton('Use', function(e: MouseEvent) {
        c.useTool(i, target);
        UI.redraw();
      }, !c.canAfford(t.cost) || !isTurn, 'use'));
    }
    return div;
  }

  static renderOfferTool(t: Tool, m: Modifier) {
    const div: HTMLElement = UI.makeDiv('tool');
    div.appendChild(UI.makeTextParagraph(t.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Cost: ${t.cost.toString()}`, 'name'));
    div.appendChild(UI.makeTextParagraph(t.effectsString(), 'effect'));
    div.appendChild(UI.makeButton(`Apply ${m.name}`, function(e: MouseEvent) {
      m.apply(t);
      moveOn();
    }, false, 'apply'));
    return div;
  }

  static renderModifier(m: Modifier, p: Player) {
    const div: HTMLElement = UI.makeDiv('modifier');
    div.appendChild(UI.makeTextParagraph(m.name, 'name'));
    div.appendChild(UI.makeTextParagraph(m.desc, 'desc'));
    for (let i = 0; i < p.tools.length; i++) {
      div.appendChild(UI.renderOfferTool(p.tools[i], m));
    }
    return div;
  }

  static setRedrawFunction(f: Function) {
    UI.redrawFunction = f;
  }

  static redraw() {
    if (UI.redrawFunction) {
      UI.redrawFunction();
    }
  }

}
