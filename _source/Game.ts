class Game {

    static currentRun: Run;

    static showTitle(): void {
        UI.fillScreen(
            UI.renderTitleScreen([
                ['New Game', () => Game.showCharSelect()],
                ['Settings', () => Game.showSettings()],
                ['Journal', () => Game.showJournal()],
                ['Credits', () => Game.showCredits()],
            ])
        );
    }

    static showCharSelect(): void {
        UI.fillScreen(
            UI.renderCharacterSelect(Game.newRun, Game.showTitle, ...characters.getAll())
        );
        console.log(characters.getAll());
    }

    static newRun(character: Player): void {
        // if the player character is being used for the first time, unlock its lore note
        let charNote = NotePool.unlockCharacterNote(character);
        if (charNote) {
            // Save unlocked notes to LocalStorage
            Save.saveNotes();
            // show the unlocked note, and then start the run when the player closes that note
            UI.fillScreen(UI.renderNote((() => Game.newRun(character)), charNote));
            return;
        }

        Game.currentRun = new Run(character);
        Game.currentRun.start();
    }

    static showCredits(): void {
        UI.fillScreen(
            UI.renderCredits([
                new CreditsEntry('May Lawver', 'Team Lead', 'Design', 'Programming'),
                new CreditsEntry('Grace Rarer', 'Programming'),
                new CreditsEntry('Pranay Rapolu', 'Music'),
                new CreditsEntry('Prindle', 'Programming'),
                new CreditsEntry('Mitchell Philipp', 'Programming'),
                new CreditsEntry('Prince Bull', 'Art'),
                new CreditsEntry('Seong Ryoo', 'Art'),
                new CreditsEntry('Finn Schiesser', 'Logo'),
            ], () => Game.showTitle())
        );
    }

    static showSettings(inGame: boolean = false): void {
        UI.fillScreen(UI.renderSettings(Game.showTitle));
    }

    static showJournal(): void {
        UI.fillScreen(UI.renderJournal(Game.showNote, Game.showTitle, NotePool.getUnlockedNotes()));
    }

    static showNote(note: Note) {
        UI.fillScreen(UI.renderNote(Game.showJournal, note));
    }

    static showGameOver(run: Run): void {
        UI.fillScreen(
            UI.makeHeader('Game Over'),
            UI.renderOptions([
                ['Back to Title Screen', () => Game.showTitle()]
            ]),
        );
    }
    
    static showVictory(run: Run): void {
        UI.fillScreen(
            UI.makeHeader('Victory!'),
            UI.renderOptions([
                ['Back to Title Screen', () => Game.showTitle()]
            ]),
        );
    }

}
