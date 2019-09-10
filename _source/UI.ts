class UI {

  static makeTextParagraph(str: string, id?: string) {
    const p: HTMLElement = document.createElement('p');
    p.innerText = str;
    if (id) {
      p.id = id;
    }
    return p;
  }

  static renderPlayer(p: Player): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    div.appendChild(UI.makeTextParagraph(p.name));
    div.appendChild(UI.makeTextParagraph(`Health: ${p.health} / ${p.maxHealth}`));
    div.appendChild(UI.makeTextParagraph(`Energy: ${p.energy} / ${p.maxEnergy}`));
    return div;
  }

  static renderTool(t: Tool): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    div.appendChild(UI.makeTextParagraph(t.name);
    div.appendChild(UI.makeTextParagraph(`Cost: ${t.cost.toString()}`));
    return div;
  }

}
