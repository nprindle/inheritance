class NotePool {
    private static notes: Note[] = [];

    static loadNote(title: string, content: string) {
        let newNote = new Note(title, content, NotePool.notes.length, false);
        NotePool.notes.push(newNote);
    }

    static reloadAllNotes() {
        NotePool.notes = [];
        loadAllNoteResources(); // defined in NoteResources.ts
    }

    static getUnlockedNotes(): Note[] {
        return NotePool.notes.filter((element: Note) => (element.unlocked));
    }

    // returns a random previously-locked note, setting it to unlocked in the process
    // returns undefined if all notes have already been unlocked
    static unlockNewNote(): Note | undefined {
        let lockedNotes = NotePool.notes.filter((element: Note) => (element.unlocked == false));
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
}