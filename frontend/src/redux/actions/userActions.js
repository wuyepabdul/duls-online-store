import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  CREATE_OR_UPDATE_USER_REQUEST,
  CREATE_OR_UPDATE_USER_SUCCESS,
  CREATE_OR_UPDATE_USER_FAIL,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_ADMIN_USER_FAIL,
  GET_CURRENT_ADMIN_USER_REQUEST,
  GET_CURRENT_ADMIN_USER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

// firebase user login action
export const userLogin = (userData) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userData });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create or update user
export const createOrUpdateUser = (authtoken, name) => async (dispatch) => {
  dispatch({ type: CREATE_OR_UPDATE_USER_REQUEST });
  try {
    const config = {
      headers: {
        authtoken,
      },
    };
    const { data } = await axios.post(
      `/api/auth/createOrUpdateUser`,
      {},
      config
    );
    const payloadData = {
      name,
      email: data.email,
      token: authtoken,
      role: data.role,
      _id: data._id,
    };
    dispatch({ type: CREATE_OR_UPDATE_USER_SUCCESS, payload: payloadData });
    //set local storage

    localStorage.setItem("userInfo", JSON.stringify({ userInfo: payloadData }));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CREATE_OR_UPDATE_USER_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get current user action
export const getCurrentUser = (authtoken) => async (dispatch) => {
  dispatch({ type: GET_CURRENT_USER_REQUEST });
  try {
    const config = {
      headers: {
        authtoken,
      },
    };
    const { data } = await axios.get(`/api/auth/currentUser`, config);

    dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: data });
    //set local storage

    // localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_CURRENT_USER_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get current user action
// create or update user
export const getCurrentAdminUser = (authtoken) => async (dispatch) => {
  dispatch({ type: GET_CURRENT_ADMIN_USER_REQUEST });
  try {
    const config = {
      headers: {
        authtoken,
      },
    };
    const { data } = await axios.get(`/api/auth/currentAdminUser`, config);

    dispatch({ type: GET_CURRENT_ADMIN_USER_SUCCESS, payload: data });
    //set local storage

    // localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_CURRENT_ADMIN_USER_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user logout action
export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};
