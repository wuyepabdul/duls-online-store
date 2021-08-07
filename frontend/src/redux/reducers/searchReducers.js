import {
  GET_SEARCH_FAIL,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  SEARCH_QUERY,
} from "../constants/searchConstants";

export const searchQueryReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSearchReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SEARCH_REQUEST:
      return { loading: true };
    case GET_SEARCH_SUCCESS:
      return { loading: false, searchResult: action.payload };
    case GET_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
