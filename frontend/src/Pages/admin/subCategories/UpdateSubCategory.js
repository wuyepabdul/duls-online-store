import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from "../../../Components/forms/CategoryForm";
import LocalSearch from "../../../Components/forms/LocalSearch";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingButton, loadingSpinner } from "../../../helpers/loading";
import { errorMessage, successMessage } from "../../../helpers/message";
import { fetchAllCategoriesAction } from "../../../redux/actions/categoryActions";
import {
  fetchAllSub,
  fetchSubBySlug,
  updateSub,
} from "../../../redux/actions/subCategoryActions";

const UpdateSubCategory = ({ history, match }) => {
  const dispatch = useDispatch();

  // state variables
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  // update subcategogry from store
  const updateSubCategory = useSelector((state) => state.updateSubCategory);
  const { loading, success, error } = updateSubCategory;

  // fetch categories
  const getAllCategories = useSelector((state) => state.getAllCategories);
  const {
    loading: categoriesLoading,
    categories,
    error: categoriesError,
  } = getAllCategories;

  const getSubCategory = useSelector((state) => state.getSubCategory);
  const { loading: subLoading, error: subError, subCategory } = getSubCategory;

  // on component mount
  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
    loadSubCategory();
  }, [dispatch]);

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("name", name, "parent", parentCategory);
    dispatch(
      updateSub(match.params.slug, { name, parent: parentCategory })
    ).then((response) => {
      console.log("updated success", response.payload);
      history.push("/admin/subcategory");
    });

    //
  };

  const loadSubCategory = () => {
    dispatch(fetchSubBySlug(match.params.slug)).then((response) => {
      setName(response.payload.name);
      setParentCategory(response.payload.parent);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {" "}
        {console.log("parent", parentCategory)}
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 ">
          {error && errorMessage(error)}
          {success && successMessage(success)}
          <h4 className="pt-5 mb-3">Update Sub Category</h4>

          {
            <>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setParentCategory(e.target.value)}
              >
                <option>Select Category</option>
                {categories !== undefined &&
                  categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      selected={cat._id === parentCategory}
                    >
                      {cat.name}
                      {console.log("subcategory  id", cat._id)}
                    </option>
                  ))}
              </select>

              <CategoryForm
                loading={loading}
                setName={setName}
                name={name}
                handleSubmit={handleSubmit}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
