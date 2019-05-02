import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    salons: [],
    isSuccess: false,
    loading: false
};

//FETCH

const fetchSalonsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchSalonsSuccess = (state, action) => {
    return updateObject(state, {
        salons: action.salons,
        loading: false
    });
};

const fetchSalonsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const resetDataAfterAction = (state, action) => {
    return updateObject(state, { isSuccess: false });
};

//CREATE

const createSalonStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const createSalonSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const createSalonFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//FETCH

const updateSalonStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const updateSalonSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const updateSalonFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//DELETE

const deleteSalonStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const deleteSalonSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const deleteSalonFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetch
        case actionTypes.FETCH_SALONS_START:
            return fetchSalonsStart(state, action);
        case actionTypes.FETCH_SALONS_SUCCESS:
            return fetchSalonsSuccess(state, action);
        case actionTypes.FETCH_SALONS_FAIL:
            return fetchSalonsFail(state, action);
        //Create
        case actionTypes.CREATE_SALON_START:
            return createSalonStart(state, action);
        case actionTypes.CREATE_SALON_FAIL:
            return createSalonFail(state, action);
        case actionTypes.CREATE_SALON_SUCCESS:
            return createSalonSuccess(state, action);
        //Update
        case actionTypes.UPDATE_SALON_START:
            return updateSalonStart(state, action);
        case actionTypes.UPDATE_SALON_FAIL:
            return updateSalonFail(state, action);
        case actionTypes.UPDATE_SALON_SUCCESS:
            return updateSalonSuccess(state, action);
        //Delete
        case actionTypes.DELETE_SALON_START:
            return deleteSalonStart(state, action);
        case actionTypes.DELETE_SALON_FAIL:
            return deleteSalonFail(state, action);
        case actionTypes.DELETE_SALON_SUCCESS:
            return deleteSalonSuccess(state, action);
        case actionTypes.RESET_DATA_AFTER_ACTION:
            return resetDataAfterAction(state, action);
        default:
            return state;
    }
};

export default reducer;
