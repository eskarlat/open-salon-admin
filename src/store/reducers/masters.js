import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    masters: [],
    isSuccess: false,
    loading: false
};

//FETCH

const fetchMastersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMastersSuccess = (state, action) => {
    return updateObject(state, {
        masters: action.masters,
        loading: false
    });
};

const fetchMastersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const resetDataAfterAction = (state, action) => {
    return updateObject(state, { isSuccess: false });
};

//CREATE

const createMasterStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const createMasterSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const createMasterFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//FETCH

const updateMasterStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const updateMasterSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const updateMasterFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

//DELETE

const deleteMasterStart = (state, action) => {
    return updateObject(state, { loading: true, isSuccess: false });
};

const deleteMasterSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const deleteMasterFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isSuccess: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetch
        case actionTypes.FETCH_MASTERS_START:
            return fetchMastersStart(state, action);
        case actionTypes.FETCH_MASTERS_SUCCESS:
            return fetchMastersSuccess(state, action);
        case actionTypes.FETCH_MASTERS_FAIL:
            return fetchMastersFail(state, action);
        //Create
        case actionTypes.CREATE_MASTER_START:
            return createMasterStart(state, action);
        case actionTypes.CREATE_MASTER_FAIL:
            return createMasterFail(state, action);
        case actionTypes.CREATE_MASTER_SUCCESS:
            return createMasterSuccess(state, action);
        //Update
        case actionTypes.UPDATE_MASTER_START:
            return updateMasterStart(state, action);
        case actionTypes.UPDATE_MASTER_FAIL:
            return updateMasterFail(state, action);
        case actionTypes.UPDATE_MASTER_SUCCESS:
            return updateMasterSuccess(state, action);
        //Delete
        case actionTypes.DELETE_MASTER_START:
            return deleteMasterStart(state, action);
        case actionTypes.DELETE_MASTER_FAIL:
            return deleteMasterFail(state, action);
        case actionTypes.DELETE_MASTER_SUCCESS:
            return deleteMasterSuccess(state, action);
        case actionTypes.RESET_DATA_AFTER_ACTION:
            return resetDataAfterAction(state, action);
        default:
            return state;
    }
};

export default reducer;
