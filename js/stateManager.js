class StateManager {
    constructor(lang) {
        this.language = lang;
    }

    getLanguage() {
        return this.language;
    }

    setLanguage(lang) {
        this.language = lang;
    }
}

export const appState = new StateManager('en');