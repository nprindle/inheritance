class NotePool {
    private static notes: Note[] = [];

    static loadNote(title: string, content: string) {
        let newNote = new Note(title, content, NotePool.notes.length, false);
        NotePool.notes.push(newNote);
    }

    static loadCharacterNote(title: string, content: string, characterName: string) {
        let newNote = new Note(title, content, NotePool.notes.length, false, characterName);
        NotePool.notes.push(newNote);
    }

    static reloadAllNotes() {
        NotePool.notes = [];
        NoteResources.loadAllNoteResources();
    }

    static getUnlockedNotes(): Note[] {
        return NotePool.notes.filter((element: Note) => (element.unlocked));
    }

    // returns a random previously-locked note, setting it to unlocked in the process
    // returns null if all notes have already been unlocked
    // Character notes are not included
    static unlockNewNote(): Note | null {
        let lockedNotes = NotePool.notes.filter((element: Note) => (element.unlocked == false)).filter((element: Note) => (element.character == undefined));
        if (lockedNotes.length == 0) {
            return undefined;
        } else {
            let next: Note = Random.fromArray(lockedNotes);
            next.unlocked = true;
            return next;
        }
    }

    // returns a list of the IDs for the unlocked notes, for serializing progress
    static getUnlockedNoteIDs() {
        let ids: number[] = [];

        NotePool.getUnlockedNotes().forEach(element => {
            ids.push(element.id);
        });

        return ids;
    }

    // sets which notes are unlocked
    // use this for deserializing saved games
    static setUnlockedNotes(unlockedIDs: number[]) {
        NotePool.notes.forEach(note => {
            let currentID: number = note.id;
            // each note is unlocked only if its ID is contained in the list of unlocked note IDs
            if (unlockedIDs.indexOf(currentID) > -1) {
                note.unlocked = true;
            } else {
                note.unlocked = false;
            }
        });
    }

    // unlock a specific note by title
    static unlockSpecificNote(title: string) {
        NotePool.notes.filter(note => (note.title == title)).forEach(note => {
            note.unlocked = true;
        });
    }

    // unlocks the note associated with this character if it hasn't already been unlocked
    // if it wasn't unlocked, returns the newly unlocked note (or the first one if there are multiple)
    // if the note for this character doesn't exist or was already unlocked
    static unlockCharacterNote(playerCharacter : Player): Note | null {
        // find any notes associated with thic character
        let characterNotes = NotePool.notes.filter((element: Note) => (element.character == playerCharacter.name)).filter((element: Note) => (!element.unlocked));
        if (characterNotes.length == 0) {
            return  null; // either this character has no associated note or it has already been unlocked
        }
        // there should usually be only one note per character, but if there are multiple we unlock all and return the first one.
        characterNotes.forEach(function(note: Note) {
            note.unlocked = true;
        });

        return characterNotes[0];
    }
}
