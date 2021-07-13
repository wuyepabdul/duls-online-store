import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
  GET_TOTAL_PRODUCTS_REQUEST,
  GET_TOTAL_PRODUCTS_SUCCESS,
  GET_TOTAL_PRODUCTS_FAIL,
  CREATE_PRODUCT_RESET,
  GET_NEW_ARRIVALS_REQUEST,
  GET_NEW_ARRIVALS_SUCCESS,
  GET_NEW_ARRIVALS_FAIL,
  RATE_PRODUCT_REQUEST,
  RATE_PRODUCT_SUCCESS,
  RATE_PRODUCT_FAIL,
  RATE_PRODUCT_RESET,
  LIST_RELATED_PRODUCTS_REQUEST,
  LIST_RELATED_PRODUCTS_SUCCESS,
  LIST_RELATED_PRODUCTS_FAIL,
} from "../constants/productConstants";

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: "Product Created",
      };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productsGetAllReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { loading: true };
    case GET_ALL_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case GET_ALL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productsGetTotalReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_TOTAL_PRODUCTS_REQUEST:
      return { loading: true };
    case GET_TOTAL_PRODUCTS_SUCCESS:
      return { loading: false, totalProducts: action.payload };
    case GET_TOTAL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productsGetNewReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_NEW_ARRIVALS_REQUEST:
      return { loading: true };
    case GET_NEW_ARRIVALS_SUCCESS:
      return { loading: false, products: action.payload };
    case GET_NEW_ARRIVALS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LIST_PRODUCTS_REQUEST:
      return { loading: true };
    case LIST_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case LIST_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productsListRelatedReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case LIST_RELATED_PRODUCTS_REQUEST:
      return { loading: true };
    case LIST_RELATED_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case LIST_RELATED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productGetReducer = (state = { product: null }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { loading: true };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRODUCT_RESET:
      return { product: null };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: "Product Successfully Updated",
      };
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productRateReducer = (state = {}, action) => {
  switch (action.type) {
    case RATE_PRODUCT_REQUEST:
      return { loading: true };
    case RATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        rating: action.payload,
        success: true,
      };
    case RATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case RATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
