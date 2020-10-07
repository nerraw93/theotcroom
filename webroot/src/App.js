import React, { Component } from "react";
import AppContainer from "./containers/AppContainer";
import thunkMiddleware from "redux-thunk";
import reducers from "./actions/reducers";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { persistCombineReducers, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faCheckCircle,
    faExclamationTriangle,
    faPlus,
    faSignInAlt,
    faSignOutAlt,
    faStar,
    faStopCircle,
    faTachometerAlt,
    faThumbsDown,
    faThumbsUp,
    faUser,
    faVideoSlash,
    fas
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./App.css";
// Config
import { persistConfig } from "./config/app";

import Http from "./modules/Http";
import Notifier from "./modules/Notifier";
import Broadcaster from './modules/Broadcaster';

library.add(faSignInAlt, fab, fas, faUser, faSignOutAlt, faExclamationTriangle, faCheckCircle, faStar, faStopCircle, faThumbsUp, faThumbsDown, faTachometerAlt, faPlus, faVideoSlash);

const middleware = [thunkMiddleware, apiMiddleware];

const reducer = persistCombineReducers(persistConfig, reducers);
const store = createStore(
    reducer,
    compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

window.http = new Http();
window.alert = new Notifier();
window.broadcaster = new Broadcaster({
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppContainer/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
