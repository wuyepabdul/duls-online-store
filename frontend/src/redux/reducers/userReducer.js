import {
  CREATE_OR_UPDATE_USER_FAIL,
  CREATE_OR_UPDATE_USER_REQUEST,
  CREATE_OR_UPDATE_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_CURRENT_ADMIN_USER_REQUEST,
  GET_CURRENT_ADMIN_USER_SUCCESS,
  GET_CURRENT_ADMIN_USER_FAIL,
  GET_CURRENT_ADMIN_USER_RESET,
} from "../constants/userConstants";

// user login reducer
export const userLoginReducer = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

//create or update user reducer
export const createOrUpdateUserReducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_OR_UPDATE_USER_REQUEST:
      return { loading: true };
    case CREATE_OR_UPDATE_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case CREATE_OR_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

// get current user reducer
export const getCurrentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_REQUEST:
      return { loading: true };
    case GET_CURRENT_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GET_CURRENT_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_CURRENT_USER_RESET:
      return {};
    default:
      return state;
  }
};

// get current admin user reducer
export const getCurrentAdminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ADMIN_USER_REQUEST:
      return { loading: true };
    case GET_CURRENT_ADMIN_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GET_CURRENT_ADMIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_CURRENT_ADMIN_USER_RESET:
      return {};
    default:
      return state;
  }
};
