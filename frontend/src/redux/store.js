import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {
  createCategoryReducer,
  deleteCategoryReducer,
  getAllCategoriesReducer,
  getCategoryByIdReducer,
  getCatSubcategoriesReducer,
  updateCategoryReducer,
} from "./reducers/categoryReducers";
import {
  createSubCategoryReducer,
  deleteSubCategoryReducer,
  getAllSubCategoriesReducer,
  getSubCategoryByIdReducer,
  updateSubCategoryReducer,
} from "./reducers/subCategoryReducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productGetReducer,
  productRateReducer,
  productsGetAllReducer,
  productsGetNewReducer,
  productsGetTotalReducer,
  productsListReducer,
  productsListRelatedReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  imageDeleteReducer,
  imageUploadReducer,
} from "./reducers/uploadReducer";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productsGetTotal: productsGetTotalReducer,
  productsGetAll: productsGetAllReducer,
  productsGetNew: productsGetNewReducer,
  productsList: productsListReducer,
  productsListRelated: productsListRelatedReducer,
  productRate: productRateReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productGet: productGetReducer,
  productUpdate: productUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  getAllCategories: getAllCategoriesReducer,
  getCategory: getCategoryByIdReducer,
  createCategory: createCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  getAllSubCategories: getAllSubCategoriesReducer,
  getSubCategory: getSubCategoryByIdReducer,
  createSubCategory: createSubCategoryReducer,
  updateSubCategory: updateSubCategoryReducer,
  deleteSubCategory: deleteSubCategoryReducer,
  getCatSubcategories: getCatSubcategoriesReducer,
  imageUpload: imageUploadReducer,
  imageDelete: imageDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
