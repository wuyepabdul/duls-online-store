import axios from "axios";
import {
  SEARCH_QUERY_FAIL,
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_SUCCESS,
} from "../constants/searchConstants";

export const searchQueryAction = (text) => async (dispatch) => {
  try {
    // dispatch({ type: SEARCH_QUERY_REQUEST });
    // const { data } = await axios.post("/api/product/searchfilters");
    dispatch({ type: SEARCH_QUERY_SUCCESS, payload: text });
    console.log("text", text);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCH_QUERY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
