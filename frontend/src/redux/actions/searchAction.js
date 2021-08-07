import axios from "axios";
import {
  GET_SEARCH_FAIL,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  SEARCH_QUERY,
} from "../constants/searchConstants";

export const searchQueryAction = (text) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_QUERY, payload: text });
  } catch (error) {
    console.log(error.message);
    /*   dispatch({
      type: SEARCH_QUERY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); */
  }
};

export const getSearchResultAction = (query) => async (dispatch) => {
  try {
    dispatch({ type: GET_SEARCH_REQUEST });
    const { data } = await axios.post(`/api/product/searchfilters`, { query });
    console.log("data", data);
    dispatch({ type: GET_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_SEARCH_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
