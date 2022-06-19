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

const initialState = {
  isLoading: false,
  error: null,
  user: {},
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        isLoggedIn: false,
      };
    case USER_PREVIOUSLY_LOGIN:
      return {
        ...state,
        isLoading: false,
        error: null,
        isLoggedIn: true,
        user: action.payload,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {},
        isLoggedIn: false,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: {},
        isLoggedIn: false,
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isLoggedIn: true,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        isLoggedIn: true,
      };
    case USER_GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        isLoggedIn: false,
      };
    case USER_GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
        isLoggedIn: true,
      };
    case USER_GOOGLE_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {},
        isLoggedIn: false,
      };
       
    case USER_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case USER_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {},
      };

    default:
      return state;
  }
};

export default userReducer;
