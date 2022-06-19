import axios from "axios";
import { GET_COURSES_FAILURE, GET_COURSES_REQUEST, GET_COURSES_SUCCESS, GET_SINGLE_COURSES_FAILURE, GET_SINGLE_COURSES_REQUEST, GET_SINGLE_COURSES_SUCCESS } from "../constants/courseConstants";

const url = process.env.REACT_APP_SERVER_URL;

export const getAllCourses = () => async (dispatch) => {
  dispatch({ type: GET_COURSES_REQUEST });
  try {
    const response = await axios.get(`${url}/course`);
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_COURSES_FAILURE, payload: error.message });
  }
};

export const getSingleCourse = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_COURSES_REQUEST });
  try {
    const response = await axios.get(`${url}/course/${id}`);
    dispatch({
      type: GET_SINGLE_COURSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_SINGLE_COURSES_FAILURE, payload: error.message });
  }
}


export const deleteCourse = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/course/${id}`);
    dispatch(getAllCourses());
  } catch (error) {
    dispatch({ type: GET_COURSES_FAILURE, payload: error.message });
  }
}

export const addCourse = (course) => async (dispatch) => {
  try {
    await axios.post(`${url}/course`, course);
    dispatch(getAllCourses());
  } catch (error) {
    dispatch({ type: GET_COURSES_FAILURE, payload: error.message });
  }
}

export const updateCourse = (course) => async (dispatch) => {
  try {
    await axios.patch(`${url}/course/${course._id}`, course);
    dispatch(getAllCourses());
  } catch (error) {
    dispatch({ type: GET_COURSES_FAILURE, payload: error.message });
  }
}
