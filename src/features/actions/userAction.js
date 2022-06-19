import axios from "axios";
import {
  USER_CREATE_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_GOOGLE_LOGIN_FAILURE,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PREVIOUSLY_LOGIN,
} from "../constants/userConstants";

const url = process.env.REACT_APP_SERVER_URL;

export const userLogIn = (inputs) => async (dispatch, getState) => {
  const { email, password } = inputs;
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const response = await axios.post(`${url}/users/login`, {
      email,
      password,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });
    localStorage.setItem("userId", response.data.user._id);
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
  }
};

export const userGoogleLogIn = (userData) => async (dispatch, getState) => {
  const { name, email, sub } = userData;
  dispatch({ type: USER_GOOGLE_LOGIN_REQUEST });
  try {
    dispatch({
      type: USER_GOOGLE_LOGIN_SUCCESS,
      payload: userData
    });
    localStorage.setItem("userId", sub);
  } catch (error) {
    dispatch({ type: USER_GOOGLE_LOGIN_FAILURE, payload: error.message });
  }
}


export const userCreate = (inputs) => async (dispatch, getState) => {
  const { user } = getState();
  const { email, password } = user;
  dispatch({ type: USER_CREATE_REQUEST });
  try {
    const response = await axios.post(`${url}/users`, inputs);
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: response.data,
    });
    localStorage.setItem("userId", response.data.user._id);
  } catch (error) {
    dispatch({ type: USER_CREATE_FAILURE, payload: error.message });
  }
};

export const userLogOut = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const response = await axios.post(`${url}/users/logout`);
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: response.data,
    });
    localStorage.removeItem("userId");
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAILURE, payload: error.message });
  }
};

export const alreadyLogin = (userId) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const response = await axios.get(`${url}/users/${userId}`);
    dispatch({
      type: USER_PREVIOUSLY_LOGIN,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
  }
}
