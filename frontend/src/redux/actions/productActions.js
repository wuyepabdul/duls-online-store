import axios from "axios";
import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
  GET_TOTAL_PRODUCTS_REQUEST,
  GET_TOTAL_PRODUCTS_SUCCESS,
  GET_TOTAL_PRODUCTS_FAIL,
  GET_NEW_ARRIVALS_REQUEST,
  GET_NEW_ARRIVALS_SUCCESS,
  GET_NEW_ARRIVALS_FAIL,
  RATE_PRODUCT_REQUEST,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_FAIL,
  LIST_RELATED_PRODUCTS_REQUEST,
  LIST_RELATED_PRODUCTS_SUCCESS,
  LIST_RELATED_PRODUCTS_FAIL,
} from "../constants/productConstants";

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/product`, product, config);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTotalProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOTAL_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/product/total`);

    dispatch({ type: GET_TOTAL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_TOTAL_PRODUCTS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllProducts = (count) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/product/listall/${count}`, config);
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNewArrivalsProducts =
  (sort, order, page) => async (dispatch) => {
    try {
      dispatch({ type: GET_NEW_ARRIVALS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/product/newarrivals`,
        { sort, order, page },
        config
      );

      dispatch({ type: GET_NEW_ARRIVALS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: GET_NEW_ARRIVALS_FAIL,
        payload:
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProducts = (sort, order, page) => async (dispatch) => {
  try {
    dispatch({ type: LIST_PRODUCTS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/product/list`,
      { sort, order, page },
      config
    );

    dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LIST_PRODUCTS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRelatedProductsAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: LIST_RELATED_PRODUCTS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/product/relatedproducts/${productId}`,
      config
    );

    dispatch({ type: LIST_RELATED_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LIST_RELATED_PRODUCTS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/product/${slug} `);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log("getData error", error.message);
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/product/${slug} `, config);

    return Promise.resolve(
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProductAction =
  (slug, productData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

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
        `/api/product/${slug} `,
        productData,
        config
      );
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      console.log("update error", error.message);
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload:
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const rateProductAction =
  (productId, star) => async (dispatch, getState) => {
    try {
      dispatch({ type: RATE_PRODUCT_REQUEST });
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
        `/api/product/rating/${productId}`,
        { star },
        config
      );
      console.log("rating data", data);
      dispatch({ type: RATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      console.log("rating error", error.message);
      dispatch({
        type: RATE_PRODUCT_FAIL,
        payload:
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
