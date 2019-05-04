import * as actionTypes from "./actionTypes";
import axios from "axios";

//FETCH

export const fetchServicesSuccess = services => {
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services: services
    };
};

export const fetchServicesFail = error => {
    return {
        type: actionTypes.FETCH_SERVICES_FAIL,
        error: error
    };
};

export const fetchServicesStart = () => {
    return {
        type: actionTypes.FETCH_SERVICES_START
    };
};

export const fetchServices = token => {
    return async dispatch => {
        dispatch(fetchServicesStart());

        try {
            const response = await axios.get("services", {
                params: {
                    token
                }
            });
            dispatch(fetchServicesSuccess(response.data));
        } catch (error) {
            dispatch(fetchServicesFail(error));
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

export const createServiceSuccess = () => {
    return {
        type: actionTypes.CREATE_SERVICE_SUCCESS
    };
};

export const createServiceFail = error => {
    return {
        type: actionTypes.CREATE_SERVICE_FAIL,
        error: error
    };
};

export const createServiceStart = () => {
    return {
        type: actionTypes.CREATE_SERVICE_START
    };
};

export const createService = (token, serviceData) => {
    return async dispatch => {
        dispatch(createServiceStart());

        const data = {
            token,
            ...serviceData
        };

        try {
            const response = await axios.post("services/create", data);
            dispatch(createServiceSuccess(response.data));
            dispatch(fetchServices(token));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(createServiceFail(error));
        }
    };
};

//UPDATE

export const updateServiceSuccess = () => {
    return {
        type: actionTypes.UPDATE_SERVICE_SUCCESS
    };
};

export const updateServiceFail = error => {
    return {
        type: actionTypes.UPDATE_SERVICE_FAIL,
        error: error
    };
};

export const updateServiceStart = () => {
    return {
        type: actionTypes.UPDATE_SERVICE_START
    };
};

export const updateService = (token, serviceData) => {
    return async dispatch => {
        dispatch(updateServiceStart());

        const data = {
            token,
            ...serviceData
        };

        try {
            const response = await axios.put("services/update", data);
            dispatch(updateServiceSuccess(response.data));
            dispatch(fetchServices(token));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(updateServiceFail(error));
        }
    };
};

//DELETE

export const deleteServiceSuccess = () => {
    return {
        type: actionTypes.DELETE_SERVICE_SUCCESS
    };
};

export const deleteServiceFail = error => {
    return {
        type: actionTypes.DELETE_SERVICE_FAIL,
        error: error
    };
};

export const deleteServiceStart = () => {
    return {
        type: actionTypes.DELETE_SERVICE_START
    };
};

export const deleteService = (token, serviceId) => {
    return async dispatch => {
        dispatch(deleteServiceStart());

        try {
            const data = {
                token,
                serviceId
            };
            const response = await axios.delete("services/delete", {
                data
            });
            dispatch(deleteServiceSuccess(response.data));
            dispatch(fetchServices(token));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(deleteServiceFail(error));
        }
    };
};
