import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingButton, loadingSpinner } from "../../../helpers/loading";
import { errorMessage, successMessage } from "../../../helpers/message";
import {
  createProduct,
  getProduct,
  updateProductAction,
} from "../../../redux/actions/productActions";
import isEmpty from "validator/lib/isEmpty";
import { toast } from "react-toastify";
import ProductUpdateForm from "../../../Components/forms/ProductUpdateForm";
import {
  fetchAllCategoriesAction,
  fetchCategorySubs,
} from "../../../redux/actions/categoryActions";
import FileUpload from "../../../Components/forms/FileUpload";
import {
  GET_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../../redux/constants/productConstants";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Sony",
    "Lenovo",
    "ASUS",
    "ACER",
    "HP",
  ],
  color: "",
  brand: "",
};

const ProductCreate = ({ match, history }) => {
  const dispatch = useDispatch();
  const productSlug = match.params.slug;

  const [subOption, setSubOption] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [arrayOfSubCategoriesIds, setArrayOfSubCategoriesIds] = useState(null);

  const [values, setValues] = useState(initialState);
  const { title, description, price, shipping, quantity, color, brand } =
    values;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productGet = useSelector((state) => state.productGet);
  const { productLoading, productError, product } = productGet;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = productUpdate;

  const getAllCategories = useSelector((state) => state.getAllCategories);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories,
  } = getAllCategories;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: GET_PRODUCT_RESET });
      dispatch({ type: UPDATE_PRODUCT_RESET });
      history.push("/admin/products");
    }

    if (!categories) {
      dispatch(fetchAllCategoriesAction());
    } else {
      setValues({ ...values, categories });
    }
  }, [categories, updateSuccess, dispatch]);

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productSlug));
    } else {
      setValues({ ...values, ...product });
      dispatch(fetchCategorySubs(product.category._id)).then((categorySub) => {
        setSubOption(categorySub.payload);
      });

      let arrayOfIds = [];
      product.subCategories.map((subcategoryId) => {
        arrayOfIds.push(subcategoryId);
      });
      setArrayOfSubCategoriesIds((prev) => arrayOfIds);
    }
  }, [dispatch, product, productSlug]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subCategories: [] });
    setSelectedCategory(e.target.value);

    dispatch(fetchCategorySubs(e.target.value)).then((res) => {
      setSubOption(res.payload);
    });
    if (values.category._id === e.target.value) {
      console.log("equal=>", values.category._id, "--", e.target.value);
      dispatch(getProduct(productSlug));
    } else {
      console.log("not equal=>", values.category._id, "--", e.target.value);
    }
    setArrayOfSubCategoriesIds([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form values", values);
    if (
      !title ||
      !description ||
      !price ||
      !shipping ||
      !quantity ||
      !color ||
      !brand
    ) {
      toast.error("All Fields are required");
    } else {
      values.subCategories = arrayOfSubCategoriesIds;
      values.category = selectedCategory ? selectedCategory : values.category;

      dispatch(updateProductAction(productSlug, values));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-3 mt-3 ">
          <AdminNav />
        </div>
        <div className="col-md-6 mt-3 ">
          {categoriesError && errorMessage(categoriesError)}
          {productError && errorMessage(productError)}
          {updateError && errorMessage(updateError)}
          {updateLoading && loadingSpinner()}
          <h4 className="text-center">Create Product</h4>
          {categoriesLoading || productLoading ? (
            loadingSpinner()
          ) : (
            <>
              <FileUpload
                values={values}
                setValues={setValues}
                setLoadingUpload
              />
              <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCategoryChange={handleCategoryChange}
                values={values}
                setValues={setValues}
                setArrayOfSubCategoriesIds={setArrayOfSubCategoriesIds}
                arrayOfSubCategoriesIds={arrayOfSubCategoriesIds}
                categories={categories}
                loading={categoriesLoading}
                subOption={subOption}
                showSubs={showSubs}
                selectedCategory={selectedCategory}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
