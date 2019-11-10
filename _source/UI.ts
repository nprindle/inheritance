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

    static renderCombatantInfo(c: Combatant): HTMLElement {
        let which;
        if (c instanceof Player) {
            which = 'player';
        } else {
            which = 'enemy';
        }
        const div: HTMLElement = UI.makeDiv(which);
        const statuses: AbstractStatus[] = c.statuses.filter(status => status.isValid());
        for (let i = 0; i < statuses.length; i++) {
            div.classList.add(`status-${Strings.cssSanitize(c.statuses[i].getName())}`);
        }
        let name = c.name;
        if (c.traits.length > 0) {
          name = `${name} (${c.traitNames.map(tuple => Strings.powerTuple(tuple)).join(', ')})`;
        }
        div.appendChild(UI.makePara(name, 'name'));
        //health, energy, etc.
        const statsDiv = UI.makeDiv('stats');
        statsDiv.appendChild(UI.makePara(`Health: ${c.health} / ${c.maxHealth}`, 'health'));
        statsDiv.appendChild(UI.makePara(`Energy: ${c.energy} / ${c.maxEnergy}`, 'energy'));
        if (c instanceof Player) {
            statsDiv.appendChild(UI.makePara(`Scrip: ${c.currency}`));
        }
        div.appendChild(statsDiv);
        if (statuses.length > 0) {
            const statusPara: HTMLElement = UI.makePara('');
            const statusSpans: HTMLElement[] = statuses.map(status => {
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
        return div;
    }

    static renderCombatant(c: Combatant, target: Combatant, isTurn: boolean, buttonArr?: HTMLElement[]): HTMLElement {
        const div: HTMLElement = UI.renderCombatantInfo(c);
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

    static renderCombatantSidebar(c: Combatant): HTMLElement {
        const div: HTMLElement = UI.renderCombatantInfo(c);
        const toolDiv: HTMLElement = document.createElement('div');
        toolDiv.classList.add('tools');
        for (let i = 0; i < c.tools.length; i++) {
            let currentDiv: HTMLElement = UI.renderTool(c.tools[i]);
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

    static renderShopMenu(shop: Shop, player: Player, exitCallback: Function): HTMLElement {
        const div: HTMLElement = UI.makeDiv(); //TODO CSS class
        div.appendChild(UI.makeHeader("Shop"));
        div.appendChild(UI.makePara("Scrip: " + player.currency));


        //TODO disable options the player cannot afford

        const modifiersPane: HTMLElement = UI.makeDiv(); //TODO CSS class
        shop.getModifierListings().forEach(([modifier, price]: [Modifier, number]) => {
            
            modifiersPane.appendChild(this.renderShopModifierListing(modifier, price, Shop.playerCanAffordModifier(modifier, player), () => {
                // make sure player can afford purchase
                if (Shop.playerCanAffordModifier(modifier, player)) {
                    UI.fillScreen(UI.renderModifier(modifier, player, (taken) => {
                        if (taken) {
                            shop.sellModifier(modifier, player);
                        }
                        // go back to the shop screen
                        UI.fillScreen(UI.renderShopMenu(shop, player, exitCallback));
                    }));
                }
            }));
        });
        div.appendChild(modifiersPane);

        const traitsPane: HTMLElement = UI.makeDiv(); //TODO CSS class
        shop.getTraitListings().forEach(([trait, price]: [Trait, number]) => {
            traitsPane.appendChild(this.renderShopTraitListing(trait, price, Shop.playerCanAffordTrait(trait, player), () => {
                shop.sellTrait(trait, player);
                // refresh this screen after inventory is changed
                UI.fillScreen(UI.renderShopMenu(shop, player, exitCallback));
            }));
        });
        div.appendChild(traitsPane);
        

        div.appendChild(UI.makeButton("Exit shop", exitCallback));
        return div;
    }

    static renderShopModifierListing(modifier: Modifier, price:number, enabled: boolean, purchaseCallback: Function): HTMLElement {
        const div: HTMLElement = UI.makeDiv(); //TODO CSS class
        div.appendChild(this.makePara(modifier.name));
        div.appendChild(this.makePara(modifier.describe()));
        div.appendChild(UI.makeButton("Purchase for " + price + " scrip", purchaseCallback, !enabled));
        return div;
    }

    static renderShopTraitListing(trait: Trait, price: number, enabled: boolean, purchaseCallback: Function) {
        const div: HTMLElement = UI.makeDiv(); //TODO CSS class
        div.appendChild(this.makePara(trait.name));
        div.appendChild(this.makePara(trait.describe()));
        div.appendChild(UI.makeButton("Purchase for " + price + " scrip", purchaseCallback, !enabled));
        return div;
    }

    static renderTrait(t: Trait, p: Player, exitCallback: Function, refusable: boolean = true) {
        const mainDiv: HTMLElement = UI.makeDiv('offer');
        const div: HTMLElement = UI.makeDiv('trait');
        div.appendChild(UI.makePara(`${t.name} Potion`, 'name'));
        div.appendChild(UI.makePara(t.describe(), 'desc'));
        div.appendChild(UI.makeButton('Drink', function() {
          p.addTrait(t);
          exitCallback(true);
        }))
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
                let currentRoom = floor.rooms[i][j];
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

        let playerCoords = Game.currentRun.playerCoordinates;
        let hasPlayer = room.coordinates.equals(playerCoords);
        let exitHasPlayer = room.exits.some(e => e.coordinates.equals(playerCoords));

        if (room.seen || room.visited) {
            div.classList.add("visible");
            room.getBlockedDirections().forEach(d => {
                let className = `blocked-${Direction[d].toLowerCase()}`;
                div.classList.add(className);
            });
            if (hasPlayer) {
                div.appendChild(UI.makeRoomIcon('player'));
            } else if (room.getRoomType() !== RoomType.Empty) {
                div.appendChild(UI.makeRoomIcon(room.getRoomType()));
            }
        }
        if (exitHasPlayer) {
            div.onclick = function(e: MouseEvent) {
                room.enter();
            };
        }
        if (room.visited) {
            div.classList.add("visited");
        } else {
            div.classList.add("unvisited");
        }
        return div;
    }

    static renderMainTitle(): HTMLElement {
        return UI.makeImg('assets/final_logo.png', 'logo');
    }

    static renderTitleScreen(options: [string, Function][]): HTMLElement {
        const div: HTMLElement = UI.makeDiv('titlescreen');
        div.appendChild(UI.renderMainTitle());
        div.appendChild(UI.renderOptions(options));
        return div;
    }

    static renderGameView(floor: Floor, player: Player): HTMLElement {
        const div = UI.makeDiv('game');
        div.appendChild(UI.renderFloor(floor));
        div.appendChild(UI.renderCombatantSidebar(player));
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

    static renderJournal(callback: Function, exit: Function, unlockedNotes: Note[]): HTMLElement {
        const div: HTMLElement = UI.makeDiv('journal');
        div.appendChild(UI.makeHeader('Unlocked Files'));
        const noteTuples: [string, Function][] = unlockedNotes.map(note => <[string, Function]> [note.title, () => callback(note)]);
        div.appendChild(UI.renderOptions(noteTuples.concat([['Close Journal', exit]])));
        return div;
    }

    static renderNote(exit: Function, note: Note): HTMLElement {
        const div: HTMLElement = UI.makeDiv('note');
        div.appendChild(UI.makeHeader(note.title, 'notetitle'));

        const noteBodyContainer: HTMLElement = UI.makeDiv('notebodycontainer');
        let paragraphs: string[] = note.content.split("\n");
        paragraphs.forEach(paragraph => noteBodyContainer.appendChild(UI.makePara(paragraph, 'notebody')));

        div.appendChild(noteBodyContainer);
        div.appendChild(UI.makeButton("Close", exit));
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
        const gameview = document.getElementById('gameview');
        gameview.innerHTML = '';
        elems.forEach(elem => gameview.appendChild(elem));
    }

    static announce(text: string): void {
        const h1: HTMLElement = UI.makeHeader('', 'announcement');
        const spans: HTMLElement[] = text.split('').map(letter => UI.makeElem('span', letter));
        const delay: number = 500;
        spans.forEach((span, index) => {
            h1.appendChild(span);
            window.setTimeout(() => {
                span.classList.add('letter');
            }, index * delay);
        });
        document.body.appendChild(h1);
        window.setTimeout(() => {
            document.body.removeChild(h1);
        }, delay * spans.length + 4000);
    }

}
