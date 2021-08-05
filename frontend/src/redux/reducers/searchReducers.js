import { SEARCH_QUERY } from "../constants/searchConstants";

export const searchQueryReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
