import axios from "axios";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from "./types";

const REACT_APP_API_URL = "http://127.0.0.1:8000";

export const load_user = () => async (dispatch) => {
    dispatch({ type: USER_LOADING });

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            Accept: "application/json",
        },
    };

    try {
        const res = await axios.get(
            `${REACT_APP_API_URL}/accounts/auth/users/me/`,
            config
        );

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const login = (username, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(
            `${REACT_APP_API_URL}/accounts/auth/jwt/create/`,
            body,
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const signup =
    (username, email, password, re_password) => async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ username, email, password, re_password });

        try {
            const res = await axios.post(
                `${REACT_APP_API_URL}/accounts/auth/users/`,
                body,
                config
            );

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: SIGNUP_FAIL,
            });
        }
    };

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};
