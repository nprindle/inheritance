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

  static renderPlayer(p: Player): HTMLElement {
    const div: HTMLElement = UI.makeDiv('player');
    div.appendChild(UI.makeTextParagraph(p.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Health: ${p.health} / ${p.maxHealth}`, 'health'));
    div.appendChild(UI.makeTextParagraph(`Energy: ${p.energy} / ${p.maxEnergy}`, 'energy'));
    const toolDiv: HTMLElement = document.createElement('div');
    toolDiv.classList.add('tools');
    for (let i = 0; i < p.tools.length; i++) {
      let currentDiv: HTMLElement = this.renderTool(p.tools[i], p, i);
      currentDiv.classList.add(`tool_${i}`);
      toolDiv.appendChild(currentDiv);
    }
    div.appendChild(toolDiv);
    return div;
  }

  static renderTool(t: Tool, p?: Player, i?: number): HTMLElement {
    const div: HTMLElement = UI.makeDiv('tool');
    div.appendChild(UI.makeTextParagraph(t.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Cost: ${t.cost.toString()}`, 'name'));
    div.appendChild(UI.makeTextParagraph(t.effectsString(), 'effect'));
    if (p && i !== undefined) {
      div.appendChild(UI.makeButton('Use', function(e: MouseEvent) {
        p.useTool(i, p);
        UI.redraw();
      }, !p.canAfford(t.cost), 'use'));
    }
    return div;
  }

  static setRedrawFunction(f: Function) {
    UI.redrawFunction = f;
  }

  static redraw() {
    UI.redrawFunction();
  }

}
