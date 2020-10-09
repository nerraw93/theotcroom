import { persistConfig } from "../config/app";
import { createStore } from "redux";
import { persistCombineReducers } from "redux-persist";
import reducers from "../actions/reducers";

export default class StoreAccessor {

    /**
     * Constructor
     * @author {goper}
     */
    constructor()
    {
        this.reducer = persistCombineReducers(persistConfig, reducers);
        this.store = createStore(this.reducer);
    }

    state() {
        return this.store.getState();
    }

    store() {
        return this.store;
    }
}
