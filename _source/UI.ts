class UI {

  static makeTextParagraph(str: string, c?: string, id?: string) {
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

  static renderPlayer(p: Player): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    div.classList.add('player');
    div.appendChild(UI.makeTextParagraph(p.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Health: ${p.health} / ${p.maxHealth}`, 'health'));
    div.appendChild(UI.makeTextParagraph(`Energy: ${p.energy} / ${p.maxEnergy}`, 'energy'));
    const toolDiv: HTMLElement = document.createElement('div');
    toolDiv.classList.add('tools');
    for (let i = 0; i < p.tools.length; i++) {
      let currentDiv: HTMLElement = this.renderTool(p.tools[i]);
      currentDiv.classList.add(`tool_${i}`);
      toolDiv.appendChild(currentDiv);
    }
    div.appendChild(toolDiv);
    return div;
  }

  static renderTool(t: Tool): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    div.classList.add('tool');
    div.appendChild(UI.makeTextParagraph(t.name, 'name'));
    div.appendChild(UI.makeTextParagraph(`Cost: ${t.cost.toString()}`, 'name'));
    return div;
  }

}
