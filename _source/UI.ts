/// <reference path="SoundManager.ts" />
/// <reference path="map/Floor.ts" />
/// <reference path="Random.ts" />

class UI {

    static redrawFunction: Function;

    private static onMapScreen: boolean;

    static makeDiv(c?: string, cList?: string[], id?: string) {
        const div: HTMLElement = document.createElement('div');
        if (c) {
            div.classList.add(c);
        }
        if (cList) {
            for (let c of cList) {
                div.classList.add(c);
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

    static makeImg(src: string, c?: string, id?: string): HTMLImageElement {
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
        return UI.makeImg(`assets/${str}`, 'room-icon');
    }

    static makeTooltip(name: string, desc: string): HTMLElement {
        const span = UI.makeElem('span', name, 'tooltip-container');
        const tooltip = UI.makeElem('span', desc, 'tooltip');
        span.appendChild(tooltip);
        return span;
    }

    static makeSlider(label: string, min: number, max: number, value: number, changeCallback: Function): HTMLElement {
        const input = document.createElement('input');
        input.type = 'range';
        input.min = `${min}`;
        input.max = `${max}`;
        input.value = `${value}`;
        input.onchange = function (this: GlobalEventHandlers, ev: Event) {
            changeCallback(this);
        }
        const para = UI.makePara(`${label}: `);
        para.appendChild(input);
        return para;
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
        if (c.imageSrc) {
            debugLog(c.imageSrc);
            div.appendChild(UI.makeImg(c.imageSrc, 'profile'));
        }
        const statuses: AbstractStatus[] = c.statuses.filter(status => status.isValid());
        for (let i = 0; i < statuses.length; i++) {
            div.classList.add(`status-${Strings.cssSanitize(c.statuses[i].getName())}`);
        }
        let namePara = UI.makePara(c.name, 'name');
        if (c.traits.length > 0) {
            namePara.appendChild(document.createTextNode(' ('));
            c.traits.forEach((tuple, i) => {
                let nameString = tuple[0].name;
                if (tuple[1] > 1) {
                    nameString += Strings.power(tuple[1]);
                }
                namePara.appendChild(UI.makeTooltip(nameString, tuple[0].describe()));
                if (i < c.traits.length - 1) {
                    namePara.appendChild(document.createTextNode(', '));
                }
            });
            namePara.appendChild(document.createTextNode(')'));
        }
        div.appendChild(namePara);
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
                const desc =  (which == 'player') ? status.getDescriptionForPlayer() : status.getDescription();
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
            div.appendChild(UI.makePara(`(${t.usesLeftThisTurn} use(s) left this turn)`));
        }
        if (t.usesPerFight < Infinity) {
            div.appendChild(UI.makePara(`(${t.usesLeftThisFight} use(s) left this fight)`));
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
            SoundManager.playSoundEffect(SoundEffects.Modifier);
            m.apply(t);
            Game.currentRun.addStatistic(RunStatistics.MODIFIERS_TAKEN, 1);
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
        for (let tool of p.tools) {
            toolDiv.appendChild(UI.renderOfferTool(tool, m, exitCallback));
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
        const div: HTMLElement = UI.makeDiv("shop");
        div.appendChild(UI.makeHeader("Shop"));
        div.appendChild(UI.makePara("You have " + player.currency + " scrip."));

        const itemsPane: HTMLElement = UI.makeDiv("shoplistscontainer");
        const modifiersPane: HTMLElement = UI.makeDiv("shoplist");
        modifiersPane.appendChild(UI.makeHeader("Tool Modifiers"));
        shop.getModifierListings().forEach((listing: ShopModifierListing) => {
            let modifier = listing.modifier;
            let price = listing.price;
            let canAffordItem = (price <= player.currency);
            modifiersPane.appendChild(this.renderShopModifierListing(modifier, price, canAffordItem, () => {
                // make sure player can afford purchase
                if (canAffordItem) {
                    UI.fillScreen(UI.renderModifier(modifier, player, (taken) => {
                        if (taken) {
                            shop.sellModifier(listing, player);
                        }
                        // go back to the shop screen
                        UI.fillScreen(UI.renderShopMenu(shop, player, exitCallback));
                    }));
                }
            }));
        });
        itemsPane.appendChild(modifiersPane);

        const traitsPane: HTMLElement = UI.makeDiv("shoplist");
        traitsPane.appendChild(UI.makeHeader("Character Traits"));
        shop.getTraitListings().forEach((listing: ShopTraitListing) => {
            let trait = listing.trait;
            let price = listing.price;
            let canAffordItem = (price <= player.currency);
            traitsPane.appendChild(this.renderShopTraitListing(trait, price, canAffordItem, () => {
                shop.sellTrait(listing, player);
                // refresh this screen after inventory is changed
                UI.fillScreen(UI.renderShopMenu(shop, player, exitCallback));
            }));
        });
        itemsPane.appendChild(traitsPane);

        div.appendChild(itemsPane);
        div.appendChild(UI.makeButton("Exit shop", exitCallback));
        return div;
    }

    static renderShopModifierListing(modifier: Modifier, price:number, enabled: boolean, purchaseCallback: Function): HTMLElement {
        const div: HTMLElement = UI.makeDiv("shopitem");
        div.appendChild(this.makePara(modifier.name));
        div.appendChild(this.makePara(modifier.describe()));
        div.appendChild(UI.makeButton("Purchase for " + price + " scrip", purchaseCallback, !enabled));
        return div;
    }

    static renderShopTraitListing(trait: Trait, price: number, enabled: boolean, purchaseCallback: Function) {
        const div: HTMLElement = UI.makeDiv("shopitem");
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
            SoundManager.playSoundEffect(SoundEffects.Trait);
            p.addTrait(t);
            Game.currentRun.addStatistic(RunStatistics.TRAITS_GAINED, 1);
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
        debugLog(floor);
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
            if (hasPlayer) {
                div.appendChild(UI.makeRoomIcon(Game.currentRun.player.floorIcon));
            } else if (room.getIcon() !== RoomIcon.NONE) {
                div.appendChild(UI.makeRoomIcon(room.getIcon()));
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

        const boxShadowAttributes = ['-moz-box-shadow', '-webkit-box-shadow', 'box-shadow'];
        const shadows = room.getBlockedDirections().map(d => UI.directionToBoxShadow(d, 4, 'black')).join(', ');
        for (let attr of boxShadowAttributes) {
            div.style[attr] = shadows;
        }

        // Apply invisible element in order to exploit it for its ::before and
        // ::after
        const cornerDiv: HTMLElement = UI.makeDiv("room-corners");
        div.appendChild(cornerDiv);

        return div;
    }

    // Convert a direction to the string representing the value of a box shadow
    // CSS property of a given width in pixels to make a border on that side
    static directionToBoxShadow(dir: Direction, width: number, color: string): string {
        switch (dir) {
            case Direction.Right:
                return `inset -${width}px 0px 0px 0px ${color}`;
            case Direction.Up:
                return `inset 0px ${width}px 0px 0px ${color}`;
            case Direction.Left:
                return `inset ${width}px 0px 0px 0px ${color}`;
            case Direction.Down:
                return `inset 0px -${width}px 0px 0px ${color}`;
        }
    }

    static handleKeyDown(e: KeyboardEvent): void {
        let dir: Direction | undefined = Directions.fromKey(e.key);
        // Arrow keys should move the player between rooms
        if (dir !== undefined && Game.currentRun && UI.isOnMapScreen()) {
            e.preventDefault();
            Game.currentRun.shiftPlayer(dir);
        }
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
        const div = UI.makeDiv();
        const container = UI.makeDiv('game');
        container.appendChild(UI.renderFloor(floor));
        container.appendChild(UI.renderCombatantSidebar(player));
        let menuButton = UI.makeButton('Main Menu', () => Game.showTitle(), false, 'main-menu');
        container.appendChild(menuButton);
        div.append(container);

        let journalHTML = UI.renderJournal(() => Game.resumeRun(), NotePool.getUnlockedNotes());

        let journalButton = UI.makeButton("Journal", () => UI.fillScreen(journalHTML), false, 'gamejournalbutton');
        div.appendChild(journalButton);

        return div;
    }

    static renderOptions(options: [string, Function][]): HTMLElement {
        const buttons: HTMLElement = UI.makeDiv('buttons');
        for (let option of options) {
            buttons.appendChild(UI.makeButton(option[0], option[1]));
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

    static renderJournal(exit: () => void, unlockedNotes: Note[]): HTMLElement {
        const div: HTMLElement = UI.makeDiv('journal');
        div.appendChild(UI.makeHeader('Unlocked Files'));

        function noteDisplayFunction(note:Note) {
            UI.fillScreen(UI.renderNote(() => UI.fillScreen(div), note));
        }
        const noteTuples: [string, Function][] = unlockedNotes.map(note => <[string, Function]> [note.title, () => noteDisplayFunction(note)]);
        div.appendChild(UI.renderOptions(noteTuples.concat([['Close Journal', exit]])));
        return div;
    }

    static renderNote(exit: Function, note: Note): HTMLElement {
        const div: HTMLElement = UI.makeDiv('note');
        div.appendChild(UI.makeHeader(note.title, 'notetitle'));

        const noteBodyContainer: HTMLElement = UI.makeDiv('notebodycontainer');
        let paragraphs: string[] = note.content.split("\n");
        paragraphs.forEach(paragraph => noteBodyContainer.appendChild(UI.renderNoteParagraph(paragraph)));

        div.appendChild(noteBodyContainer);
        div.appendChild(UI.makeButton("Close", exit));
        return div;
    }

    static renderNoteParagraph(text: string): HTMLElement {
        const p = UI.makePara('', 'notebody');
        const split = text.split(/[{}]/g);
        split.map((str, i) => {
            switch (i % 2) {
                case 0:
                    return document.createTextNode(str);
                case 1:
                    return UI.makeElem('span', str, 'blur');
            }
        }).forEach(elem => p.appendChild(elem));
        return p;
    }

    static renderScripReward(exit: Function, reward: number) {
        const div: HTMLElement = UI.makeDiv('note');
        div.appendChild(UI.makeHeader(`You found ${reward} scrip!`));
        div.appendChild(UI.makeButton("Continue", exit));
        return div;
    }

    static renderSettings(exit: Function): HTMLElement {
        const div = UI.makeDiv('settings');
        div.appendChild(UI.makeHeader('Settings'));
        let volume = Settings.getVolumePercent();
        div.appendChild(UI.makeSlider('Volume', 0, 100, volume, t => {
            Settings.setVolumePercent(parseInt(t.value));
            SoundManager.playSoundEffect(SoundEffects.Noise);
            Save.saveSettings();
        }));

        div.appendChild(UI.makeButton("Reset Game", () => {
            UI.fillScreen(UI.renderResetConfirm(() => UI.fillScreen(UI.renderSettings(exit))));
        }))

        div.appendChild(UI.makeButton('Back', exit));
        return div;
    }

    static renderResetConfirm(cancelExitCallback: Function): HTMLElement {
        const div = UI.makeDiv('settings');
        div.appendChild(UI.makeHeader('Are you sure you want to reset the game?'));
        div.appendChild(UI.makePara("All progress will be lost, and settings will be restored to defaults."));
        div.appendChild(UI.makeButton('Cancel', cancelExitCallback));
        div.appendChild(UI.makeButton('Reset Game', () => Game.resetGame()));
        return div;
    }

    static renderCharacterSelect(callback: Function, exit: Function, ...chars: Player[]): HTMLElement {
        const div: HTMLElement = UI.makeDiv('charselect');
        const charHeader = UI.makeHeader('Choose Your Character');
        div.appendChild(charHeader);
        const charDiv: HTMLElement = UI.makeDiv('characters');
        chars.forEach(char => charDiv.appendChild(UI.renderCharacterObject(callback, char)));
        charDiv.appendChild(UI.renderCharacter('assets/random.png', 'Random', () => callback(Random.fromArray(chars))));
        div.appendChild(charDiv);
        div.appendChild(UI.makeButton('Back to Title', exit))
        return div;
    }

    static renderCharacterObject(callback: Function, character: Player): HTMLElement {
        let filename = character.imageSrc || 'assets/The_Reject_-_Done.png';
        return UI.renderCharacter(filename, character.name, () => callback(character));
    }

    static renderCharacter(filename: string, name: string, callback: Function): HTMLElement {
        const div: HTMLElement = UI.makeDiv('character');
        div.appendChild(UI.makeElem('h2', name));
        const img: HTMLImageElement = UI.makeImg(filename, 'profile');
        img.alt = name;
        img.onclick = () => callback();
        div.appendChild(img);
        return div;
    }

    static renderRun(run: Run): HTMLElement{
        const div = UI.makeDiv('run-stats');
        const descs: string[] = Object.keys(RunStatistics).map(stat => run.statisticString(RunStatistics[stat])).filter(x => !!x);
        descs.forEach(desc => div.appendChild(UI.makePara(desc)));
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
        UI.onMapScreen = false;
        const gameview = document.getElementById('gameview');
        gameview.innerHTML = '';
        elems.forEach(elem => gameview.appendChild(elem));
    }

    static showMapScreen(): void {
        UI.fillScreen(UI.renderGameView(Game.currentRun.currentFloor, Game.currentRun.player));
        // TODO: this is a total hack
        UI.onMapScreen = true;
    }

    static isOnMapScreen(): boolean {
        return UI.onMapScreen;
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
