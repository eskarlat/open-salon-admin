import * as actionTypes from "./actionTypes";
import axios from "axios";

//FETCH

export const fetchReservationsSuccess = reservations => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
        reservations: reservations
    };
};

export const fetchReservationsFail = error => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_FAIL,
        error: error
    };
};

export const fetchReservationsStart = () => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_START
    };
};

export const fetchReservations = (token, masterId, date) => {
    return async dispatch => {
        dispatch(fetchReservationsStart());

        try {
            const response = await axios.get("reservations", {
                params: {
                    token,
                    masterId,
                    date
                }
            });
            dispatch(fetchReservationsSuccess(response.data));
        } catch (error) {
            dispatch(fetchReservationsFail(error));
        }
    };
};
