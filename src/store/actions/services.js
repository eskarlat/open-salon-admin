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

export const fetchServices = ownerId => {
    return async dispatch => {
        dispatch(fetchServicesStart());

        try {
            const response = await axios.get("services", {
                params: {
                    ownerId
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

export const createService = (ownerId, serviceData) => {
    return async dispatch => {
        dispatch(createServiceStart());

        try {
            const response = await axios.post("services/create", serviceData);
            dispatch(createServiceSuccess(response.data));
            dispatch(fetchServices(ownerId));
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

export const updateService = (owner, serviceData) => {
    return async dispatch => {
        dispatch(updateServiceStart());

        try {
            const response = await axios.put("services/update", serviceData);
            dispatch(updateServiceSuccess(response.data));
            dispatch(fetchServices(owner));
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

export const deleteService = (owner, serviceId) => {
    return async dispatch => {
        dispatch(deleteServiceStart());

        try {
            const data = {
                serviceId
            };
            const response = await axios.delete("services/delete", {
                data
            });
            dispatch(deleteServiceSuccess(response.data));
            dispatch(fetchServices(owner));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(deleteServiceFail(error));
        }
    };
};
