import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createOrUpdateUserReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  userInfo: createOrUpdateUserReducer,
});

// set default user state in local storage and redux store
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// store initial state
const initialState = {
  userInfo: userInfoFromLocalStorage,
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
