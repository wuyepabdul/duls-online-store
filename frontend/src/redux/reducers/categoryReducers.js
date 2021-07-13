import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
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

export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return { loading: true };
    case GET_ALL_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_ALL_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCategoryByIdReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case GET_CATEGORY_BY_ID_REQUEST:
      return { loading: true };
    case GET_CATEGORY_BY_ID_SUCCESS:
      return { loading: false, category: action.payload };
    case GET_CATEGORY_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCatSubcategoriesReducer = (state = { subs: null }, action) => {
  switch (action.type) {
    case GET_CATEGORY_SUBS_REQUEST:
      return { loading: true };
    case GET_CATEGORY_SUBS_SUCCESS:
      return { loading: false, subs: action.payload };
    case GET_CATEGORY_SUBS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: action.payload };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload };
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
