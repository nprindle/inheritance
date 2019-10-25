/// <reference path="map/Floor.ts" />

class UI {

    static redrawFunction: Function;

    static makeDiv(c?: string, cList?: string[], id?: string) {
        const div: HTMLElement = document.createElement('div');
        if (c) {
            div.classList.add(c);
        }
        if (cList) {
            for (let i = 0; i < cList.length; i++) {
                div.classList.add(cList[i]);
            }
        }
        if (id) {
            div.id = id;
        }
        return div;
    }

    static makeElem(elem: string, str: string, c?: string, id?: string) {
        const e: HTMLElement = document.createElement(elem);
        e.innerText = str;
        if (c) {
            e.classList.add(c);
        }
        if (id) {
            e.id = id;
        }
        return e;
    }

    static makePara(str: string, c?: string, id?: string): HTMLElement {
        return UI.makeElem('p', str, c, id);
    }

    static makeHeader(str: string, c?: string, id?: string, level: number = 1): HTMLElement {
        return UI.makeElem(`h${level}`, str, c, id);
    }

    static makeButton(str: string, func: Function, disabled: boolean = false, c?: string, id?: string): HTMLButtonElement {
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
        b.onclick = function (ev: MouseEvent) {
            ev.preventDefault;
            func.call(this, ev);
        };
        return b;
    }

    static makeImg(src: string, c?: string, id?: string): HTMLElement {
        const img: HTMLImageElement = document.createElement('img');
        img.src = src;
        if (c) {
            img.classList.add(c);
        }
        if (id) {
            img.id = id;
        }
        return img;
    }

    static makeRoomIcon(str: string): HTMLElement {
        return UI.makeImg(`assets/temp_${str}.png`, 'room-icon');
    }

    static makeTooltip(name: string, desc: string): HTMLElement {
        const span = UI.makeElem('span', name, 'tooltip-container');
        const tooltip = UI.makeElem('span', desc, 'tooltip');
        span.appendChild(tooltip);
        return span;
    }

    static fakeClick(elem: HTMLElement): void {
        //TODO: structure this more reasonably
        elem.classList.remove('fakeclick');
        elem.classList.add('fakeclick');
        window.setTimeout(function() {
            elem.onclick!(new MouseEvent('click'));
            elem.classList.remove('fakeclick');
        }, 500);
    }

    static renderCombatant(c: Combatant, target: Combatant, isTurn: boolean, buttonArr?: HTMLElement[]): HTMLElement {
        let which;
        if (c instanceof Player) {
            which = 'player';
        } else {
            which = 'enemy';
        }
        const div: HTMLElement = UI.makeDiv(which);
        for (let i = 0; i < c.statuses.length; i++) {
            div.classList.add(`status-${c.statuses[i].getName()}`);
        }
        let name = c.name;
        if (c.traits.length > 0) {
          name = `${name} (${c.traits.map(x => x.name).join(', ')})`;
        }
        div.appendChild(UI.makePara(name, 'name'));
        div.appendChild(UI.makePara(`Health: ${c.health} / ${c.maxHealth}`, 'health'));
        div.appendChild(UI.makePara(`Energy: ${c.energy} / ${c.maxEnergy}`, 'energy'));
        if (c.statuses.length > 0) {
            const statusPara: HTMLElement = UI.makePara('');
            const statusSpans: HTMLElement[] = c.statuses.map(status => {
                const name = `${status.amount} ${Strings.capitalize(status.getName())}`;
                const desc = status.getDescription();
                return UI.makeTooltip(name, desc);
            });
            for (let i = 0; i < statusSpans.length; i++) {
                statusPara.appendChild(statusSpans[i]);
                if (i !== statusSpans.length - 1) {
                    statusPara.appendChild(document.createTextNode(', '));
                }
            }
            div.appendChild(statusPara);
        }
        const toolDiv: HTMLElement = document.createElement('div');
        toolDiv.classList.add('tools');
        for (let i = 0; i < c.tools.length; i++) {
            let currentDiv: HTMLElement = UI.renderCombatTool(c.tools[i], c, i, target, isTurn, buttonArr);
            currentDiv.classList.add(`tool_${i}`);
            toolDiv.appendChild(currentDiv);
        }
        div.appendChild(toolDiv);
        return div;
    }

    static renderTool(t: Tool): HTMLElement {
        const div: HTMLElement = UI.makeDiv('tool');
        div.appendChild(UI.makePara(t.name, 'name'));
        div.appendChild(UI.makePara(`Cost: ${t.cost.toString()}`, 'cost'));
        div.appendChild(UI.makePara(t.effectsString(), 'effect'));
        if (t.multiplier > 1) {
            div.appendChild(UI.makePara(`x${t.multiplier}`, 'multiplier'));
        }
        return div;
    }

    static renderCombatTool(t: Tool, c?: Combatant, i?: number, target?: Combatant, isTurn?: boolean, buttonArr?: HTMLElement[]) {
        const div: HTMLElement = UI.renderTool(t);
        if (t.usesPerTurn < Infinity) {
            div.appendChild(UI.makePara(`(${t.usesLeft} use(s) left this turn)`));
        }
        if (c && i !== undefined && target !== undefined) {
            let b = UI.makeButton('Use', function(e: MouseEvent) {
                c.useTool(i, target);
                UI.redraw();
            }, !t.usableBy(c) || !isTurn, 'use');
            div.appendChild(b);
            if (buttonArr !== undefined){
                buttonArr.push(b);
            }
        }
        return div;
    }

    static renderOfferTool(t: Tool, m: Modifier, callback: Function) {
        const div: HTMLElement = UI.renderTool(t);
        if (t.usesPerTurn < Infinity) {
            div.appendChild(UI.makePara(`usable ${t.usesPerTurn} time(s) per turn`));
        }
        div.appendChild(UI.makeButton(`Apply ${m.name}`, function(e: MouseEvent) {
            m.apply(t);
            callback(true);
        }, false, 'apply'));
        return div;
    }

    static renderModifier(m: Modifier, p: Player, exitCallback: Function, refusable: boolean = true) {
        const mainDiv: HTMLElement = UI.makeDiv('offer');
        const div: HTMLElement = UI.makeDiv('modifier');
        div.appendChild(UI.makePara(m.name, 'name'));
        div.appendChild(UI.makePara(m.describe(), 'desc'));
        const toolDiv: HTMLElement = UI.makeDiv('tools');
        for (let i = 0; i < p.tools.length; i++) {
            toolDiv.appendChild(UI.renderOfferTool(p.tools[i], m, exitCallback));
        }
        div.appendChild(toolDiv);
        if (refusable) {
            div.appendChild(UI.makeButton('No Thank You', function() {
                exitCallback(false);
            }));
        } else {
            div.appendChild(UI.makeButton("Can't Refuse!", function() {}, true));
        }
        mainDiv.appendChild(div);
        return mainDiv;
    }

    static renderFloor(floor: Floor) {
        console.log(floor);
        const div: HTMLElement = UI.makeDiv("map");
        div.innerHTML = '';
        for (let i = 0; i < floor.height; i++) {
            const row: HTMLElement = UI.makeDiv("map-row");
            for (let j = 0; j < floor.width; j++) {
                let currentRoom = floor.rooms[i][j]
                let visible = false;
                if (currentRoom) {
                    row.appendChild(UI.renderRoom(currentRoom));
                } else {
                    row.appendChild(UI.makeDiv("room", ["none"]));
                }
            }
            div.appendChild(row);
        }
        return div;
    }

    static renderRoom(room: Room) {
        const div: HTMLElement = UI.makeDiv("room");
        div.classList.add(room.getRoomType() + "-room");
        let visible = room.hasPlayer || room.exits.some(e => e.hasPlayer);
        if (visible || room.visited) {
            div.classList.add("visible");
            if (room.hasPlayer) {
                div.appendChild(UI.makeRoomIcon('player'));
            } else if (room.getRoomType() !== RoomType.Empty) {
                div.appendChild(UI.makeRoomIcon(room.getRoomType()));
            }
        }
        if (!room.hasPlayer && visible) {
            div.onclick = function(e: MouseEvent) {
                room.enter();
            };
        }
        if (room.visited) {
            div.classList.add("visited");
        } else {
            div.classList.add("unvisited");
        }
        div.appendChild(document.createTextNode(room.distanceFromEntrance.toString()));
        return div;
    }

    static renderMainTitle(): HTMLElement {
        //return UI.makeHeader('The Prototype Inheritance', 'titletext');
        return UI.makeImg('assets/temp_logo.png', 'logo');
    }

    static renderTitleScreen(options: [string, Function][]): HTMLElement {
        const div: HTMLElement = UI.makeDiv('titlescreen');
        div.appendChild(UI.renderMainTitle());
        div.appendChild(UI.renderOptions(options));
        return div;
    }

    static renderOptions(options: [string, Function][]): HTMLElement {
        const buttons: HTMLElement = UI.makeDiv('buttons');
        for (let i = 0; i < options.length; i++) {
            buttons.appendChild(UI.makeButton(options[i][0], options[i][1]));
        }
        return buttons;
    }

    static renderCreditsEntry(entry: CreditsEntry): HTMLElement {
        const div: HTMLElement = UI.makeDiv('entry');
        if (entry.roles.length > 0) {
            div.appendChild(UI.makeHeader(entry.name, 'name', undefined, 2));
            div.appendChild(UI.makePara(entry.roles.join(', '), 'roles'));
        } else {
            div.appendChild(UI.makePara(entry.name, 'sololine'));
        }
        return div;
    }

    static renderCredits(credits: CreditsEntry[], endfunc?: Function): HTMLElement {
        const div: HTMLElement = UI.makeDiv('credits');
        div.appendChild(UI.renderMainTitle());
        credits.map(x => UI.renderCreditsEntry(x)).forEach(val => {
            div.appendChild(val);
        });
        if (endfunc) {
            div.appendChild(UI.makeButton('Return to Title', endfunc));
        }
        return div;
    }

    static renderCharacterSelect(callback: Function, exit: Function, ...chars: Player[]): HTMLElement {
        const div: HTMLElement = UI.makeDiv('charselect');
        div.appendChild(UI.makeHeader('Choose Your Character'));
        const tuples: [string, Function][] = chars.map(char => <[string, Function]> [char.name, () => callback(char)]);
        div.appendChild(UI.renderOptions(tuples.concat([['Back to Title', exit]])));
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

    static fillScreen(...elems: HTMLElement[]): void {
        document.body.innerHTML = '';
        elems.forEach(elem => document.body.appendChild(elem));
    }

}
