import * as actionTypes from "./actionTypes";
import axios from "axios";

export const resetRedirect = () => {
    return {
        type: actionTypes.RESET_REDIRECT
    };
};

export const redirectTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(resetRedirect());
        }, 2000);
    };
};

//Register

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    };
};

export const registerFail = error => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const register = formData => {
    return async dispatch => {
        dispatch(registerStart());

        try {
            const response = await axios.post("auth/register", formData);
            dispatch(registerSuccess());
        } catch (error) {
            dispatch(registerFail(error.response.data));
        }
    };
};

//Login

export const loginSuccess = (token, userId, user) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token,
        userId,
        user
    };
};

export const loginFail = error => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const login = formData => {
    return async dispatch => {
        dispatch(loginStart());

        try {
            const response = await axios.post("auth/login", {
                auth: {
                    email: formData.email,
                    password: formData.password
                }
            });
            const expirationDate = new Date(
                new Date().getTime() + response.data.expiresIn * 1000
            );

            localStorage.setItem("os-token", response.data.token);
            localStorage.setItem("os-expirationDate", expirationDate);
            localStorage.setItem("os-userId", response.data.userId);

            dispatch(
                loginSuccess(
                    response.data.token,
                    response.data.userId,
                    response.data.user
                )
            );
            dispatch(checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            dispatch(loginFail(error.response.data));
        }
    };
};

//fetch user info

export const fetchUserInfoSuccess = user => {
    return {
        type: actionTypes.FETCH_USER_INFO_SUCCESS,
        user: user
    };
};

export const fetchUserInfoFail = error => {
    return {
        type: actionTypes.FETCH_USER_INFO_FAIL,
        error: error
    };
};

export const fetchUserInfoStart = () => {
    return {
        type: actionTypes.FETCH_USER_INFO_START
    };
};

export const fetchUserInfo = token => {
    return async dispatch => {
        dispatch(fetchUserInfoStart());

        try {
            const response = await axios.get("users/me", {
                params: {
                    token
                }
            });

            dispatch(fetchUserInfoSuccess(response.data));
        } catch (error) {
            dispatch(fetchUserInfoFail(error.response.data));
        }
    };
};

//Auth stuff

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("os-token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("os-expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("os-userId");
                dispatch(loginSuccess(token, userId));
                dispatch(fetchUserInfo(token));
                const expiresIn =
                    (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(expiresIn));
            }
        }
    };
};

export const logout = () => {
    localStorage.removeItem("os-token");
    localStorage.removeItem("os-expirationDate");
    localStorage.removeItem("os-userId");

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

//Account activate

export const accountActivateSuccess = () => {
    return {
        type: actionTypes.ACCOUNT_ACTIVATE_SUCCESS
    };
};

export const accountActivateFail = error => {
    return {
        type: actionTypes.ACCOUNT_ACTIVATE_FAIL,
        error: error
    };
};

export const accountActivateStart = () => {
    return {
        type: actionTypes.ACCOUNT_ACTIVATE_START
    };
};

export const accountActivate = id => {
    return async dispatch => {
        dispatch(accountActivateStart());

        try {
            const response = await axios.post("auth/activate", {
                id
            });
            dispatch(accountActivateSuccess());
            dispatch(redirectTimeout());
        } catch (error) {
            dispatch(accountActivateFail(error.response.data));
        }
    };
};

//Forgot password

export const forgotPasswordSuccess = () => {
    return {
        type: actionTypes.FORGOT_PASSWORD_SUCCESS
    };
};

export const forgotPasswordFail = error => {
    return {
        type: actionTypes.FORGOT_PASSWORD_FAIL,
        error: error
    };
};

export const forgotPasswordStart = () => {
    return {
        type: actionTypes.FORGOT_PASSWORD_START
    };
};

export const forgotPassword = email => {
    return async dispatch => {
        dispatch(forgotPasswordStart());

        try {
            const response = await axios.post("auth/reset_password", {
                email: email
            });
            dispatch(forgotPasswordSuccess());
        } catch (error) {
            dispatch(forgotPasswordFail(error.response.data));
        }
    };
};

//Reset password

export const resetPasswordSuccess = () => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS
    };
};

export const resetPasswordFail = error => {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: error
    };
};

export const resetPasswordStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    };
};

export const resetPassword = (formData, rememberToken) => {
    return async dispatch => {
        dispatch(resetPasswordStart());

        try {
            const response = await axios.post("auth/reset", {
                password: formData.password,
                rememberToken
            });
            dispatch(resetPasswordSuccess());
        } catch (error) {
            dispatch(resetPasswordFail(error.response.data));
        }
    };
};
