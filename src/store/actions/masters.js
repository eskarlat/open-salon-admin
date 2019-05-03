import * as actionTypes from "./actionTypes";
import axios from "axios";

//FETCH

export const fetchMastersSuccess = masters => {
    return {
        type: actionTypes.FETCH_MASTERS_SUCCESS,
        masters: masters
    };
};

export const fetchMastersFail = error => {
    return {
        type: actionTypes.FETCH_MASTERS_FAIL,
        error: error
    };
};

export const fetchMastersStart = () => {
    return {
        type: actionTypes.FETCH_MASTERS_START
    };
};

export const fetchMasters = ownerId => {
    return async dispatch => {
        dispatch(fetchMastersStart());

        try {
            const response = await axios.get("masters", {
                params: {
                    ownerId
                }
            });
            dispatch(fetchMastersSuccess(response.data));
        } catch (error) {
            dispatch(fetchMastersFail(error));
        }
    };
};

export const reset = () => {
    return {
        type: actionTypes.RESET_DATA_AFTER_ACTION
    };
};

export const resetDataAfterAction = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(reset());
        }, 2000);
    };
};

//CREATE

export const createMasterSuccess = () => {
    return {
        type: actionTypes.CREATE_MASTER_SUCCESS
    };
};

export const createMasterFail = error => {
    return {
        type: actionTypes.CREATE_MASTER_FAIL,
        error: error
    };
};

export const createMasterStart = () => {
    return {
        type: actionTypes.CREATE_MASTER_START
    };
};

export const createMaster = (ownerId, masterData) => {
    return async dispatch => {
        dispatch(createMasterStart());

        try {
            const response = await axios.post("masters/create", masterData);
            dispatch(createMasterSuccess(response.data));
            dispatch(fetchMasters(ownerId));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(createMasterFail(error));
        }
    };
};

//UPDATE

export const updateMasterSuccess = () => {
    return {
        type: actionTypes.UPDATE_MASTER_SUCCESS
    };
};

export const updateMasterFail = error => {
    return {
        type: actionTypes.UPDATE_MASTER_FAIL,
        error: error
    };
};

export const updateMasterStart = () => {
    return {
        type: actionTypes.UPDATE_MASTER_START
    };
};

export const updateMaster = (owner, masterData) => {
    return async dispatch => {
        dispatch(updateMasterStart());

        try {
            const response = await axios.put("masters/update", masterData);
            dispatch(updateMasterSuccess(response.data));
            dispatch(fetchMasters(owner));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(updateMasterFail(error));
        }
    };
};

//DELETE

export const deleteMasterSuccess = () => {
    return {
        type: actionTypes.DELETE_MASTER_SUCCESS
    };
};

export const deleteMasterFail = error => {
    return {
        type: actionTypes.DELETE_MASTER_FAIL,
        error: error
    };
};

export const deleteMasterStart = () => {
    return {
        type: actionTypes.DELETE_MASTER_START
    };
};

export const deleteMaster = (owner, masterId) => {
    return async dispatch => {
        dispatch(deleteMasterStart());

        try {
            const data = {
                masterId
            };
            const response = await axios.delete("masters/delete", {
                data
            });
            dispatch(deleteMasterSuccess(response.data));
            dispatch(fetchMasters(owner));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(deleteMasterFail(error));
        }
    };
};
