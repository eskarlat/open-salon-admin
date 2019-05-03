import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    services: [],
    isSuccess: false,
    loading: false
};

//FETCH

const fetchServicesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchServicesSuccess = (state, action) => {
    return updateObject(state, {
        services: action.services,
        loading: false
    });
};

const fetchServicesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const resetDataAfterAction = (state, action) => {
    return updateObject(state, { isSuccess: false });
};

//CREATE

const createServiceStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const createServiceSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const createServiceFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//FETCH

const updateServiceStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const updateServiceSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const updateServiceFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//DELETE

const deleteServiceStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const deleteServiceSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const deleteServiceFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetch
        case actionTypes.FETCH_SERVICES_START:
            return fetchServicesStart(state, action);
        case actionTypes.FETCH_SERVICES_SUCCESS:
            return fetchServicesSuccess(state, action);
        case actionTypes.FETCH_SERVICES_FAIL:
            return fetchServicesFail(state, action);
        //Create
        case actionTypes.CREATE_SERVICE_START:
            return createServiceStart(state, action);
        case actionTypes.CREATE_SERVICE_FAIL:
            return createServiceFail(state, action);
        case actionTypes.CREATE_SERVICE_SUCCESS:
            return createServiceSuccess(state, action);
        //Update
        case actionTypes.UPDATE_SERVICE_START:
            return updateServiceStart(state, action);
        case actionTypes.UPDATE_SERVICE_FAIL:
            return updateServiceFail(state, action);
        case actionTypes.UPDATE_SERVICE_SUCCESS:
            return updateServiceSuccess(state, action);
        //Delete
        case actionTypes.DELETE_SERVICE_START:
            return deleteServiceStart(state, action);
        case actionTypes.DELETE_SERVICE_FAIL:
            return deleteServiceFail(state, action);
        case actionTypes.DELETE_SERVICE_SUCCESS:
            return deleteServiceSuccess(state, action);
        case actionTypes.RESET_DATA_AFTER_ACTION:
            return resetDataAfterAction(state, action);
        default:
            return state;
    }
};

export default reducer;
