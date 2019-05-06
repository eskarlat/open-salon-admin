import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

//Reducers
import salonsReducer from "./store/reducers/salons";
import locationsReducer from "./store/reducers/locations";
import servicesReducer from "./store/reducers/services";
import mastersReducer from "./store/reducers/masters";
import reservationsReducer from "./store/reducers/reservations";
import clientsReducer from "./store/reducers/clients";
import authReducer from "./store/reducers/auth";

const redux =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null;

const composeEnhancers = redux || compose;

const rootReducer = combineReducers({
    sal: salonsReducer,
    loc: locationsReducer,
    ser: servicesReducer,
    mas: mastersReducer,
    res: reservationsReducer,
    cl: clientsReducer,
    auth: authReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

//Default url for axios
axios.defaults.baseURL = "https://open-salon.herokuapp.com/api/";

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
