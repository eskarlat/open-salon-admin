import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    clients: [],
    loading: false
};

//FETCH

const fetchClientsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchClientsSuccess = (state, action) => {
    return updateObject(state, {
        clients: action.clients,
        loading: false
    });
};

const fetchClientsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetch
        case actionTypes.FETCH_CLIENTS_START:
            return fetchClientsStart(state, action);
        case actionTypes.FETCH_CLIENTS_SUCCESS:
            return fetchClientsSuccess(state, action);
        case actionTypes.FETCH_CLIENTS_FAIL:
            return fetchClientsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
