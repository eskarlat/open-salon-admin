import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    reservations: [],
    loading: false
};

//FETCH

const fetchReservationsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchReservationsSuccess = (state, action) => {
    return updateObject(state, {
        reservations: action.reservations,
        loading: false
    });
};

const fetchReservationsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetch
        case actionTypes.FETCH_RESERVATIONS_START:
            return fetchReservationsStart(state, action);
        case actionTypes.FETCH_RESERVATIONS_SUCCESS:
            return fetchReservationsSuccess(state, action);
        case actionTypes.FETCH_RESERVATIONS_FAIL:
            return fetchReservationsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
