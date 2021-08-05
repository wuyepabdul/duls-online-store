import axios from "axios";
import {
  CREATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAIL,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  GET_ALL_SUB_CATEGORIES_FAIL,
  GET_ALL_SUB_CATEGORIES_REQUEST,
  GET_ALL_SUB_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORY_BY_ID_FAIL,
  GET_SUB_CATEGORY_BY_ID_REQUEST,
  GET_SUB_CATEGORY_BY_ID_SUCCESS,
  UPDATE_SUB_CATEGORY_FAIL,
  UPDATE_SUB_CATEGORY_REQUEST,
  UPDATE_SUB_CATEGORY_SUCCESS,
} from "../constants/subCategoryConstants";

export const fetchAllSub = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SUB_CATEGORIES_REQUEST });

    const { data } = await axios.get("/api/subCategory");
    dispatch({ type: GET_ALL_SUB_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_ALL_SUB_CATEGORIES_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchSubBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUB_CATEGORY_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/subCategory/${slug}`);
    return Promise.resolve(
      dispatch({ type: GET_SUB_CATEGORY_BY_ID_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_SUB_CATEGORY_BY_ID_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSub = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_SUB_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/subCategory`, formData, config);
    dispatch({ type: CREATE_SUB_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CREATE_SUB_CATEGORY_FAIL,
      payload: error.response.data ? error.response.data : error.message,
    });
  }
};

export const updateSub = (slug, updatedData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_SUB_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/subCategory/${slug}`,
      updatedData,
      config
    );

    return Promise.resolve(
      dispatch({ type: UPDATE_SUB_CATEGORY_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UPDATE_SUB_CATEGORY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSub = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_SUB_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/subCategory/${slug}`, config);
    dispatch({ type: DELETE_SUB_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: DELETE_SUB_CATEGORY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
