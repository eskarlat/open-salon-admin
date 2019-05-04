import * as actionTypes from "./actionTypes";
import axios from "axios";

//FETCH

export const fetchClientsSuccess = clients => {
    return {
        type: actionTypes.FETCH_CLIENTS_SUCCESS,
        clients: clients
    };
};

export const fetchClientsFail = error => {
    return {
        type: actionTypes.FETCH_CLIENTS_FAIL,
        error: error
    };
};

export const fetchClientsStart = () => {
    return {
        type: actionTypes.FETCH_CLIENTS_START
    };
};

export const fetchClients = token => {
    return async dispatch => {
        dispatch(fetchClientsStart());

        try {
            const response = await axios.get("clients", {
                params: {
                    token
                }
            });
            dispatch(fetchClientsSuccess(response.data));
        } catch (error) {
            dispatch(fetchClientsFail(error));
        }
    };
};
