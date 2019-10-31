/// <reference path="util.ts" />
/// <reference path="UI.ts" />
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
    // load notes
    NotePool.reloadAllNotes();
    // unlock these notes at the start of the game (all other notes default to locked)
    NotePool.unlockSpecificNote("I am a title");
    NotePool.unlockSpecificNote("Title Goes Here");

    Game.showTitle();
}

if (window.innerHeight === 0) {
    window.console.log('tools', tools);
    window.console.log('modifiers', modifiers);
    window.console.log('enemies', enemies);
    window.console.log('characters', characters);
}
