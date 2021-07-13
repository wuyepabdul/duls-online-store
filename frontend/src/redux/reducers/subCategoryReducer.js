import {
  CREATE_SUB_CATEGORY_SUCCESS,
  CREATE_SUB_CATEGORY_REQUEST,
  CREATE_SUB_CATEGORY_FAIL,
  GET_ALL_SUB_CATEGORIES_REQUEST,
  GET_ALL_SUB_CATEGORIES_SUCCESS,
  GET_ALL_SUB_CATEGORIES_FAIL,
  GET_SUB_CATEGORY_BY_ID_REQUEST,
  GET_SUB_CATEGORY_BY_ID_SUCCESS,
  GET_SUB_CATEGORY_BY_ID_FAIL,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_FAIL,
  UPDATE_SUB_CATEGORY_REQUEST,
  UPDATE_SUB_CATEGORY_SUCCESS,
  UPDATE_SUB_CATEGORY_FAIL,
  CREATE_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_RESET,
} from "../constants/subCategoryConstants";

export const getAllSubCategoriesReducer = (
  state = { subCategories: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_SUB_CATEGORIES_REQUEST:
      return { loading: true };
    case GET_ALL_SUB_CATEGORIES_SUCCESS:
      return { loading: false, subCategories: action.payload };
    case GET_ALL_SUB_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSubCategoryByIdReducer = (
  state = { subCategory: {} },
  action
) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_BY_ID_REQUEST:
      return { loading: true };
    case GET_SUB_CATEGORY_BY_ID_SUCCESS:
      return { loading: false, subCategory: action.payload };
    case GET_SUB_CATEGORY_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_SUB_CATEGORY_SUCCESS:
      return { loading: false, success: action.payload };
    case CREATE_SUB_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUB_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        subCategory: action.payload,
        success: "Sub Category Updated Successfully",
      };
    case UPDATE_SUB_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUB_CATEGORY_REQUEST:
      return { loading: true };
    case DELETE_SUB_CATEGORY_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_SUB_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SUB_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
