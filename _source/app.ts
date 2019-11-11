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
    // unlock these notes at the start of the game (all other notes default to locked)
    NotePool.unlockSpecificNote("I am a title");
    NotePool.unlockSpecificNote("Title Goes Here");
    NotePool.unlockSpecificNote("This file contains \"quotes\"");
    // Save unlocked notes to LocalStorage
    Save.saveNotes();

    Game.showTitle();
}

if (window.innerHeight === 0) {
    window.console.log('tools', tools);
    window.console.log('modifiers', modifiers);
    window.console.log('enemies', enemies);
    window.console.log('characters', characters);
}
