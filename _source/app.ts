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
    // unlock the tutorial at the start of the game.
    NotePool.unlockSpecificNote("Tutorial");
    // Save unlocked notes to LocalStorage
    Save.saveNotes();

    //TODO: is there any better way to do this?
    
    const button: HTMLElement = UI.makeButton('Enter the Game', () => Game.showTitle());
    UI.fillScreen(button);
}

if (window.innerHeight === 0) {
    window.console.log('tools', tools);
    window.console.log('modifiers', modifiers);
    window.console.log('enemies', enemies);
    window.console.log('characters', characters);
}
