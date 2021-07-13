import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_CATEGORY_BY_ID_FAIL,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_SUBS_FAIL,
  GET_CATEGORY_SUBS_REQUEST,
  GET_CATEGORY_SUBS_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/categoryConstants";
import axios from "axios";

export const fetchAllCategoriesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/category", config);
    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchCategorySlugAction = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/category/${slug}`);
    return Promise.resolve(
      dispatch({ type: GET_CATEGORY_BY_ID_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_CATEGORY_BY_ID_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchCategorySubs = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_SUBS_REQUEST });

    const { data } = await axios.get(`/api/category/sub/${categoryId}`);

    return Promise.resolve(
      dispatch({ type: GET_CATEGORY_SUBS_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_CATEGORY_SUBS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategoryAction =
  (category) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CATEGORY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/category`, category, config);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: CREATE_CATEGORY_FAIL,
        payload: error.response.data ? error.response.data : error.message,
      });
    }
  };

export const updateCategoryAction =
  (slug, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });

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
        `/api/category/${slug}`,
        category,
        config
      );
      return Promise.resolve(
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data })
      );
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload:
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCategoryAction = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/category/${slug}`, config);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
