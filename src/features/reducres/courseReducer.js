import {
  GET_COURSES_FAILURE,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_SINGLE_COURSES_FAILURE,
  GET_SINGLE_COURSES_REQUEST,
  GET_SINGLE_COURSES_SUCCESS,
} from "../constants/courseConstants";

const initialState = {
  isLoading: false,
  course: {},
  singleCourse :{},
  eror: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        course: action.payload,
        error: null,
      };
    case GET_COURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_SINGLE_COURSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        singleCourse: {},
        error: null,
      };
    case GET_SINGLE_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        course: {},
        singleCourse: action.payload,
        error: null,
      };
    case GET_SINGLE_COURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        singleCourse: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;