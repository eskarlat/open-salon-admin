import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    isAuth: false,
    token: null,
    userId: null,
    loading: false,
    redirect: false,
    registerSuccess: false,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    user: {}
};

const resetRedirect = (state, action) => {
    return updateObject(state, { redirect: false });
};

//Register

const registerStart = (state, action) => {
    return updateObject(state, { loading: true, registerSuccess: false });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        registerSuccess: true
    });
};

const registerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        registerSuccess: false
    });
};

//Login

const loginStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        isAuth: true,
        token: action.token,
        userId: action.userId,
        user: action.user || {},
        loading: false
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

export const logout = (state, action) => {
    return updateObject(state, {
        isAuth: false,
        token: null,
        userId: null,
        user: {}
    });
};

//Account Activate

const accountActivationStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const accountActivationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        redirect: false
    });
};

const accountActivationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: true
    });
};

//Forgot password

const forgotPasswordStart = (state, action) => {
    return updateObject(state, { loading: true, forgotPasswordSuccess: false });
};

const forgotPasswordSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        forgotPasswordSuccess: true
    });
};

const forgotPasswordFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        forgotPasswordSuccess: false,
        loading: false
    });
};

//reset password

const resetPasswordStart = (state, action) => {
    return updateObject(state, { loading: true, resetPasswordSuccess: false });
};

const resetPasswordSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        redirect: false,
        resetPasswordSuccess: true
    });
};

const resetPasswordFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: true,
        resetPasswordSuccess: false
    });
};

//fetch user info
const fetchUserInfoStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchUserInfoSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        loading: false
    });
};

const fetchUserInfoFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET_REDIRECT:
            return resetRedirect(state, action);
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action);
        //Register
        case actionTypes.REGISTER_START:
            return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL:
            return registerFail(state, action);

        //login
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);

        //forgot password
        case actionTypes.FORGOT_PASSWORD_START:
            return forgotPasswordStart(state, action);
        case actionTypes.FORGOT_PASSWORD_SUCCESS:
            return forgotPasswordSuccess(state, action);
        case actionTypes.FORGOT_PASSWORD_FAIL:
            return forgotPasswordFail(state, action);

        //reset password
        case actionTypes.RESET_PASSWORD_START:
            return resetPasswordStart(state, action);
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return resetPasswordSuccess(state, action);
        case actionTypes.RESET_PASSWORD_FAIL:
            return resetPasswordFail(state, action);

        //account activation
        case actionTypes.ACCOUNT_ACTIVATE_START:
            return accountActivationStart(state, action);
        case actionTypes.ACCOUNT_ACTIVATE_SUCCESS:
            return accountActivationSuccess(state, action);
        case actionTypes.ACCOUNT_ACTIVATE_FAIL:
            return accountActivationFail(state, action);

        //fetch user info
        case actionTypes.FETCH_USER_INFO_START:
            return fetchUserInfoStart(state, action);
        case actionTypes.FETCH_USER_INFO_SUCCESS:
            return fetchUserInfoSuccess(state, action);
        case actionTypes.FETCH_USER_INFO_FAIL:
            return fetchUserInfoFail(state, action);
        default:
            return state;
    }
};

export default reducer;
