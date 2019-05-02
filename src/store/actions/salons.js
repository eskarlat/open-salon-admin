import * as actionTypes from "./actionTypes";
import axios from "axios";

//FETCH

export const fetchSalonsSuccess = salons => {
    return {
        type: actionTypes.FETCH_SALONS_SUCCESS,
        salons: salons
    };
};

export const fetchSalonsFail = error => {
    return {
        type: actionTypes.FETCH_SALONS_FAIL,
        error: error
    };
};

export const fetchSalonsStart = () => {
    return {
        type: actionTypes.FETCH_SALONS_START
    };
};

export const fetchSalons = ownerId => {
    return async dispatch => {
        dispatch(fetchSalonsStart());

        try {
            const response = await axios.post("salons", {
                owner: ownerId
            });
            dispatch(fetchSalonsSuccess(response.data));
        } catch (error) {
            dispatch(fetchSalonsFail(error));
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

export const createSalonSuccess = () => {
    return {
        type: actionTypes.CREATE_SALON_SUCCESS
    };
};

export const createSalonFail = error => {
    return {
        type: actionTypes.CREATE_SALON_FAIL,
        error: error
    };
};

export const createSalonStart = () => {
    return {
        type: actionTypes.CREATE_SALON_START
    };
};

export const createSalon = (owner, salon) => {
    return async dispatch => {
        dispatch(createSalonStart());

        try {
            const response = await axios.post("salons/create", {
                owner,
                salon
            });
            dispatch(createSalonSuccess(response.data));
            dispatch(fetchSalons(owner));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(createSalonFail(error));
        }
    };
};

//UPDATE

export const updateSalonSuccess = () => {
    return {
        type: actionTypes.UPDATE_SALON_SUCCESS
    };
};

export const updateSalonFail = error => {
    return {
        type: actionTypes.UPDATE_SALON_FAIL,
        error: error
    };
};

export const updateSalonStart = () => {
    return {
        type: actionTypes.UPDATE_SALON_START
    };
};

export const updateSalon = (owner, salonId, salon) => {
    return async dispatch => {
        dispatch(updateSalonStart());

        try {
            const response = await axios.put("salons/update", {
                salonId,
                salon
            });
            dispatch(updateSalonSuccess(response.data));
            dispatch(fetchSalons(owner));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(updateSalonFail(error));
        }
    };
};

//DELETE

export const deleteSalonSuccess = () => {
    return {
        type: actionTypes.DELETE_SALON_SUCCESS
    };
};

export const deleteSalonFail = error => {
    return {
        type: actionTypes.DELETE_SALON_FAIL,
        error: error
    };
};

export const deleteSalonStart = () => {
    return {
        type: actionTypes.DELETE_SALON_START
    };
};

export const deleteSalon = (owner, salonId) => {
    return async dispatch => {
        dispatch(deleteSalonStart());

        try {
            const data = {
                salonId
            };
            const response = await axios.delete("salons/delete", {
                data
            });
            dispatch(deleteSalonSuccess(response.data));
            dispatch(fetchSalons(owner));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(deleteSalonFail(error));
        }
    };
};