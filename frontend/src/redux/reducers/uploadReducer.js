import {
  DELETE_FILE_FAIL,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_RESET,
  UPLOAD_FILE_SUCCESS,
} from "../constants/uploadConstants";

// uplaod image
export const imageUploadReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return { loading: true };
    case UPLOAD_FILE_SUCCESS:
      return { loading: false, success: action.payload };
    case UPLOAD_FILE_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_FILE_RESET:
      return [];
    default:
      return state;
  }
};

// delete image
export const imageDeleteReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_FILE_REQUEST:
      return { loading: true };
    case DELETE_FILE_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_FILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
