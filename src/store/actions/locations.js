import * as actionTypes from "./actionTypes";
import axios from "axios";

//FETCH

export const fetchLocationsSuccess = locations => {
    return {
        type: actionTypes.FETCH_LOCATIONS_SUCCESS,
        locations: locations
    };
};

export const fetchLocationsFail = error => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAIL,
        error: error
    };
};

export const fetchLocationsStart = () => {
    return {
        type: actionTypes.FETCH_LOCATIONS_START
    };
};

export const fetchLocations = token => {
    return async dispatch => {
        dispatch(fetchLocationsStart());

        try {
            const response = await axios.get("locations", {
                params: {
                    token
                }
            });
            dispatch(fetchLocationsSuccess(response.data));
        } catch (error) {
            dispatch(fetchLocationsFail(error));
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

export const createLocationSuccess = () => {
    return {
        type: actionTypes.CREATE_LOCATION_SUCCESS
    };
};

export const createLocationFail = error => {
    return {
        type: actionTypes.CREATE_LOCATION_FAIL,
        error: error
    };
};

export const createLocationStart = () => {
    return {
        type: actionTypes.CREATE_LOCATION_START
    };
};

export const createLocation = (token, locationData) => {
    return async dispatch => {
        dispatch(createLocationStart());

        const data = {
            token,
            ...locationData
        };

        try {
            const response = await axios.post("locations/create", data);
            dispatch(createLocationSuccess(response.data));
            dispatch(fetchLocations(token));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(createLocationFail(error));
        }
    };
};

//UPDATE

export const updateLocationSuccess = () => {
    return {
        type: actionTypes.UPDATE_LOCATION_SUCCESS
    };
};

export const updateLocationFail = error => {
    return {
        type: actionTypes.UPDATE_LOCATION_FAIL,
        error: error
    };
};

export const updateLocationStart = () => {
    return {
        type: actionTypes.UPDATE_LOCATION_START
    };
};

export const updateLocation = (token, locationData) => {
    return async dispatch => {
        dispatch(updateLocationStart());

        const data = {
            token,
            ...locationData
        };

        try {
            const response = await axios.put("locations/update", data);
            dispatch(updateLocationSuccess(response.data));
            dispatch(fetchLocations(token));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(updateLocationFail(error));
        }
    };
};

//DELETE

export const deleteLocationSuccess = () => {
    return {
        type: actionTypes.DELETE_LOCATION_SUCCESS
    };
};

export const deleteLocationFail = error => {
    return {
        type: actionTypes.DELETE_LOCATION_FAIL,
        error: error
    };
};

export const deleteLocationStart = () => {
    return {
        type: actionTypes.DELETE_LOCATION_START
    };
};

export const deleteLocation = (token, locationId) => {
    return async dispatch => {
        dispatch(deleteLocationStart());

        try {
            const data = {
                token,
                locationId
            };
            const response = await axios.delete("locations/delete", {
                data
            });
            dispatch(deleteLocationSuccess(response.data));
            dispatch(fetchLocations(token));
            dispatch(resetDataAfterAction());
        } catch (error) {
            dispatch(deleteLocationFail(error));
        }
    };
};
