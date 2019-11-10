class Save {
    static isSupported: boolean = window.localStorage !== undefined && window.localStorage !== null;

    // The name of the key to use to store note data in LocalStorage
    private static lsNoteKey = 'unlocked_notes';

    // Saves the current state of the notes to local storage, if it is
    // available. Returns true if the store succeeded. The return value usually
    // does not need to be inspected.
    static saveNotes(): boolean {
        if (Save.isSupported) {
            let noteIDs = NotePool.getUnlockedNoteIDs();
            let json = JSON.stringify(noteIDs);
            window.localStorage.setItem(Save.lsNoteKey, json);
            return true;
        }
        return false;
    }

    // Loads the current state of the notes to local storage, if it is
    // available. Returns true if the load succeeded, or false if storage is
    // not available, no note data was loaded, or it contained invalid note
    // data. The return value usually does not need to be inspected.
    static loadNotes(): boolean {
        if (Save.isSupported) {
            try {
                let contents = window.localStorage.getItem(Save.lsNoteKey);
                // If LocalStorage is available but the key isn't present, then
                // they just haven't played the game before
                if (contents === null) {
                    return true;
                }
                let noteIDs: number[] = JSON.parse(contents);
                // JSON parsing is pretty unsafe in Javascript, so we should be
                // very careful that we actually get back the right kind of
                // value
                let isArray = Array.isArray(noteIDs) && noteIDs.every(x => typeof x === "number");
                if (isArray) {
                    NotePool.setUnlockedNotes(noteIDs);
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                // Failed JSON parsing throws a SyntaxError
                if (e instanceof SyntaxError) {
                    return false;
                } else {
                    throw e;
                }
            }
        }
        return false;
    }

    static saveSettings(): boolean {
        return false;
    }

    static loadSettings(): boolean {
        return false;
    }

}
