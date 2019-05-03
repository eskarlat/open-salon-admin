import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    locations: [],
    isSuccess: false,
    loading: false
};

//FETCH

const fetchLocationsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchLocationsSuccess = (state, action) => {
    return updateObject(state, {
        locations: action.locations,
        loading: false
    });
};

const fetchLocationsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const resetDataAfterAction = (state, action) => {
    return updateObject(state, { isSuccess: false });
};

//CREATE

const createLocationStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const createLocationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const createLocationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//FETCH

const updateLocationStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const updateLocationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const updateLocationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//DELETE

const deleteLocationStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const deleteLocationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const deleteLocationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetch
        case actionTypes.FETCH_LOCATIONS_START:
            return fetchLocationsStart(state, action);
        case actionTypes.FETCH_LOCATIONS_SUCCESS:
            return fetchLocationsSuccess(state, action);
        case actionTypes.FETCH_LOCATIONS_FAIL:
            return fetchLocationsFail(state, action);
        //Create
        case actionTypes.CREATE_LOCATION_START:
            return createLocationStart(state, action);
        case actionTypes.CREATE_LOCATION_FAIL:
            return createLocationFail(state, action);
        case actionTypes.CREATE_LOCATION_SUCCESS:
            return createLocationSuccess(state, action);
        //Update
        case actionTypes.UPDATE_LOCATION_START:
            return updateLocationStart(state, action);
        case actionTypes.UPDATE_LOCATION_FAIL:
            return updateLocationFail(state, action);
        case actionTypes.UPDATE_LOCATION_SUCCESS:
            return updateLocationSuccess(state, action);
        //Delete
        case actionTypes.DELETE_LOCATION_START:
            return deleteLocationStart(state, action);
        case actionTypes.DELETE_LOCATION_FAIL:
            return deleteLocationFail(state, action);
        case actionTypes.DELETE_LOCATION_SUCCESS:
            return deleteLocationSuccess(state, action);
        case actionTypes.RESET_DATA_AFTER_ACTION:
            return resetDataAfterAction(state, action);
        default:
            return state;
    }
};

export default reducer;
