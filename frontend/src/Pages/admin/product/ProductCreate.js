import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingButton, loadingSpinner } from "../../../helpers/loading";
import { errorMessage, successMessage } from "../../../helpers/message";
import { createProduct } from "../../../redux/actions/productActions";
import isEmpty from "validator/lib/isEmpty";
import { toast } from "react-toastify";
import ProductForm from "../../../Components/forms/ProductForm";
import {
  fetchAllCategoriesAction,
  fetchCategorySubs,
} from "../../../redux/actions/categoryActions";
import FileUpload from "../../../Components/forms/FileUpload";
import { CREATE_PRODUCT_RESET } from "../../../redux/constants/productConstants";
import { UPLOAD_FILE_RESET } from "../../../redux/constants/uploadConstants";
import {
  fetchAllCategories,
  fetchSubCategoriesOfCategory,
} from "../../../functions/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
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

const ProductCreate = ({ history }) => {
  const dispatch = useDispatch();

  const [subOption, setSubOption] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [uploadImgLoading, setUploadImgLoading] = useState(false);

  const [values, setValues] = useState(initialState);
  const {
    title,
    description,
    price,
    categories,
    category,
    brands,
    subCategories,
    shipping,
    quantity,
    images,
    colors,
    color,
    brand,
  } = values;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success, error } = productCreate;

  const getAllCategories = useSelector((state) => state.getAllCategories);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories: categoriesList,
  } = getAllCategories;

  useEffect(() => {
    loadCategories();
    if (success) {
      history.push("/admin/products");
      toast.success("Product Created Successfully");
      dispatch({ type: CREATE_PRODUCT_RESET });
      setValues({ ...values, images: [] });
    }
  }, [success, categoriesList, dispatch]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const loadCategories = () => {
    setUploadImgLoading(true);
    fetchAllCategories(userInfo.token)
      .then((res) => {
        setValues({ ...values, categories: res });
        setUploadImgLoading(false);
      })
      .catch((err) => {
        setUploadImgLoading(false);
        toast.error(err);
      });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subCategories: [], category: e.target.value });

    fetchSubCategoriesOfCategory(e.target.value)
      .then((res) => {
        setSubOption(res);
        setShowSubs(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isEmpty(title) ||
      isEmpty(description) ||
      isEmpty(price) ||
      isEmpty(shipping) ||
      isEmpty(quantity) ||
      isEmpty(color) ||
      isEmpty(brand) ||
      !category ||
      !subCategories
    ) {
      toast.error("All Fields are required");
    } else {
      dispatch(createProduct(values));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-3 mt-3 ">
          <AdminNav />
        </div>
        <div className="col-md-6 mt-3 ">
          {error && errorMessage(error)}
          {success && successMessage(success)}
          {loading && loadingSpinner()}
          <h4 className="text-center">Create Product</h4>
          {!values.categories || !values.categories.length ? (
            loadingSpinner()
          ) : (
            <>
              <FileUpload
                values={values}
                setValues={setValues}
                uploadImgLoading={uploadImgLoading}
                success={success}
              />
              <ProductForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCategoryChange={handleCategoryChange}
                values={values}
                setValues={setValues}
                loading={loading}
                subOption={subOption}
                showSubs={showSubs}
                success={success}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
