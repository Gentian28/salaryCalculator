class StateManager {
    constructor(key, value) {
        this[key] = value;
    }

    getPropertyByKey(key) {
        return this[key];
    }

    setState(key, value) {
        this[key] = value;
    }
}

export const appState = new StateManager('language', 'en');
appState.setState(
    'currencyRate',
    {
        usd_all: null,
        eur_all: null
    }
);
appState.setState('activeCurrency', 'all');