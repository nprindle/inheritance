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
}