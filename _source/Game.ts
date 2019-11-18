/// <reference path="SoundManager.ts" />

class Game {

    static currentRun: Run;

    static showTitle(): void {
        let options;
        SoundManager.playSong(MusicTracks.MainTheme);
        // If we've started a run, we can resume it
        if (Game.currentRun) {
            options = [
                ['New Game', () => Game.showCharSelect()],
                ['Resume Play', () => Game.resumeRun()],
                ['Settings', () => Game.showSettings()],
                ['Journal', () => Game.showJournal()],
                ['Credits', () => Game.showCredits()],
            ];
        } else {
            options = [
                ['New Game', () => Game.showCharSelect()],
                ['Settings', () => Game.showSettings()],
                ['Journal', () => Game.showJournal()],
                ['Credits', () => Game.showCredits()],
            ];
        }
        UI.fillScreen(UI.renderTitleScreen(options));
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

    static resumeRun(): void {
        UI.fillScreen(UI.renderGameView(Game.currentRun.currentFloor, Game.currentRun.player));
    }

    // clears local storage and restarts game
    static resetGame(): void {
        Save.clearLocalStorage();
        window.location.reload();
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
                new CreditsEntry('Seong Ryoo', 'Art', 'Music'),
                new CreditsEntry('Finn Schiesser', 'Logo'),
            ], () => Game.showTitle())
        );
    }

    static showSettings(inGame: boolean = false): void {
        UI.fillScreen(UI.renderSettings(Game.showTitle));
    }

    static showJournal(): void {
        UI.fillScreen(UI.renderJournal(() => Game.showTitle(), NotePool.getUnlockedNotes()));
    }

    static showGameOver(run: Run): void {
        this.currentRun = undefined;
        UI.fillScreen(
            UI.makeHeader('Game Over'),
            UI.renderRun(run),
            UI.renderOptions([
                ['Back to Title Screen', () => Game.showTitle()]
            ]),
        );
    }

    static showVictory(run: Run): void {
        this.currentRun = undefined;
        UI.fillScreen(
            UI.makeHeader('Victory!'),
            UI.renderRun(run),
            UI.renderOptions([
                ['Back to Title Screen', () => Game.showTitle()]
            ]),
        );
    }

}
