import axios from "axios";
import {
  DELETE_FILE_FAIL,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
} from "../constants/uploadConstants";

export const uploadFile = (image) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_FILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/upload/uploadimages",
      image,
      config
    );

    return Promise.resolve(
      dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UPLOAD_FILE_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFile = (imageId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_FILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/upload/removeimages",
      imageId,
      config
    );

    return Promise.resolve(
      dispatch({ type: DELETE_FILE_SUCCESS, payload: data })
    );
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: DELETE_FILE_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
