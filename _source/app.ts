/// <reference path="util.ts" />
/// <reference path="Settings.ts" />
/// <reference path="UI.ts" />
/// <reference path="SoundManager.ts" />
/// <reference path="Player.ts" />
/// <reference path="effects.ts" />
/// <reference path="Fight.ts" />
/// <reference path="Modifier.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="tools.ts" />
/// <reference path="modifiers.ts" />
/// <reference path="characters.ts" />
/// <reference path="enemies.ts" />
/// <reference path="CreditsEntry.ts" />
/// <reference path="Game.ts" />

window.onload = function() {
    //initialize sound manager
    SoundManager.init();
    // Load any cached settings
    Save.loadSettings();
    // Load note data
    NotePool.reloadAllNotes();
    // Try to load any unlocked notes if present
    Save.loadNotes();

    //TODO: is there any better way to do this?

    const button: HTMLElement = UI.makeButton('Enter the Game', () => Game.showTitle(), false, 'enter-button');
    const div: HTMLElement = UI.makeDiv('enter-wrap');
    div.appendChild(button);
    UI.fillScreen(div);

    // Attach keyboard input listener
    document.onkeydown = (e: KeyboardEvent) => {
        UI.handleKeyDown(e);
    };

    const images = [
        'The_Catburgurlar.png',
        'The_Clone.png',
        'The_Reject_-_Done.png',
        'final_logo.png',
        'goldfish.png',
        'random.png',
        'temp_collectible.png',
        'temp_enemy.png',
        'temp_entrance.png',
        'temp_exit.png',
        'temp_logo.png',
        'temp_modifier.png',
        'temp_money.png',
        'temp_player.png',
        'temp_shop.png',
        'temp_tool.png',
        'temp_trait.png',
        'the_shell.png',
        'thegranddaughter.png',
        'tiles/arch block.png',
        'tiles/base block.png',
        'tiles/character tiles/granddaughter.png',
        'tiles/character tiles/the cat.png',
        'tiles/character tiles/the clone.png',
        'tiles/character tiles/the reject.png',
        'tiles/character tiles/the shell.png',
        'tiles/crack top.png',
        'tiles/horizontal block.png',
        'tiles/items and misc tiles/boss.png',
        'tiles/items and misc tiles/enemy.png',
        'tiles/items and misc tiles/exit.png',
        'tiles/items and misc tiles/goldfish.png',
        'tiles/items and misc tiles/modifier.png',
        'tiles/items and misc tiles/note.png',
        'tiles/items and misc tiles/shop.png',
        'tiles/items and misc tiles/trait.png',
        'tiles/ivy top 2.png',
        'tiles/ivy top.png',
        'tiles/nosferatu block.png',
        'tiles/picture block.png',
        'tiles/vertical wall.png',
        'titletexture.png',
        'titletexture3.png',
        'titletexture4.png',
        'titletexture_newlogo.png',
        'titletexture_newlogo2.png',
        'titletexturebig.png',
        'titletexturebright.png',
    ]

    for (let img of images) {
        let el = new Image();
        // let el: HTMLImageElement = document.createElement('img');
        el.src = img;
    }
}

if (window.innerHeight === 0) {
    window.console.log('tools', tools);
    window.console.log('modifiers', modifiers);
    window.console.log('enemies', enemies);
    window.console.log('characters', characters);
}

