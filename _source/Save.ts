class Save {
    static isSupported: boolean = window.localStorage !== undefined && window.localStorage !== null;

    // The names of the keys to use in LocalStorage
    private static lsNoteKey = 'unlocked_notes';
    private static lsSettingsKey = 'settings';

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
        if (Save.isSupported) {
            let obj = Settings.dumpToObject();
            let json = JSON.stringify(obj);
            window.localStorage.setItem(Save.lsSettingsKey, json);
            return true
        }
        return false;
    }

    static loadSettings(): boolean {
        if (Save.isSupported) {
            try {
                let contents = window.localStorage.getItem(Save.lsSettingsKey);
                if (contents === null) {
                    return true;
                }
                let obj: any = JSON.parse(contents);
                // We can't inspect the keys yet; we rely on
                // Settings.loadFromObject for that
                if (isSettingsOptions(obj)) {
                    Settings.loadFromObject(obj);
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

}
