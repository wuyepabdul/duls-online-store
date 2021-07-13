import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmpty } from "validator";
import CategoryForm from "../../../Components/forms/CategoryForm";
import LocalSearch from "../../../Components/forms/LocalSearch";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingSpinner } from "../../../helpers/loading";
import { errorMessage, successMessage } from "../../../helpers/message";
import { fetchAllCategoriesAction } from "../../../redux/actions/categoryActions";
import {
  createSub,
  deleteSub,
  fetchAllSub,
} from "../../../redux/actions/subCategoryActions";
import {
  CREATE_SUB_CATEGORY_RESET,
  DELETE_SUB_CATEGORY_RESET,
} from "../../../redux/constants/subCategoryConstants";

const CreateSubCategory = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createSubCategory = useSelector((state) => state.createSubCategory);
  const { loading, success, error } = createSubCategory;

  const deleteSubCategory = useSelector((state) => state.deleteSubCategory);
  const { error: deleteError, success: deleteSuccess } = deleteSubCategory;

  const getAllCategories = useSelector((state) => state.getAllCategories);
  const { categories, error: categoriesError } = getAllCategories;

  const getAllSubCategories = useSelector((state) => state.getAllSubCategories);
  const {
    loading: subCategoriesLoading,
    subCategories,
    error: subCategoriesError,
  } = getAllSubCategories;

  useEffect(() => {
    if (success) {
      toast.success(`${name} sub category created`);
      dispatch({ type: CREATE_SUB_CATEGORY_RESET });
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: DELETE_SUB_CATEGORY_RESET });
    }
    if (userInfo && userInfo.role === "admin") {
      dispatch(fetchAllCategoriesAction());
      dispatch(fetchAllSub());
    } else {
      history.push("/");
    }
  }, [success, deleteSuccess, categoriesError, dispatch, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(name) || !parentCategory) {
      toast.error("All Fields are required");
    } else {
      dispatch(createSub({ name, parent: parentCategory }, userInfo.token));
      setName("");
      setParentCategory("");
    }
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSub(slug, userInfo.token));
      window.location.reload();
    }
  };

  const searched = (searchKeyword) => (category) =>
    category.name.toLowerCase().includes(searchKeyword);

  return (
    <div className="container-fluid">
      {console.log("parent", parentCategory)}
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 ">
          {error && errorMessage(error)}
          {success && successMessage(success)}
          <h4 className="pt-5 mb-3">Create Sub Category</h4>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option defaultValue>Select Category</option>
            {categories !== undefined &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          <CategoryForm
            loading={loading}
            setName={setName}
            name={name}
            handleSubmit={handleSubmit}
          />

          <div className="mt-4">
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {subCategoriesLoading ? (
                  loadingSpinner()
                ) : subCategoriesError ? (
                  <div>{errorMessage(subCategoriesError)}</div>
                ) : subCategories.length === 0 ? (
                  <div>{errorMessage("You have No Sub Categories")}</div>
                ) : (
                  subCategories
                    .filter(searched(keyword))
                    .map((subCategory, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{subCategory.name}</td>
                        <td>
                          <Link
                            className="btn btn-sm btn-primary"
                            to={`/admin/subCategory/edit/${subCategory.slug}`}
                            role="button"
                          >
                            <i className="far fa-edit me-2"></i>Edit
                          </Link>{" "}
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleDelete(subCategory.slug)}
                          >
                            <i className="fas fa-trash-alt me-1"></i>Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategory;
