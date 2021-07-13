import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../../Components/forms/CategoryForm";
import LocalSearch from "../../../Components/forms/LocalSearch";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingSpinner } from "../../../helpers/loading";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "../../../helpers/message";
import {
  createCategoryAction,
  deleteCategoryAction,
  fetchAllCategoriesAction,
} from "../../../redux/actions/categoryActions";
import { CREATE_CATEGORY_RESET } from "../../../redux/constants/categoryConstants";

const CreateCategory = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createCategory = useSelector((state) => state.createCategory);
  const { loading, success, error } = createCategory;

  const deleteCategory = useSelector((state) => state.deleteCategory);
  const { error: deleteError, success: deleteSuccess } = deleteCategory;

  const getAllCategories = useSelector((state) => state.getAllCategories);
  const {
    loading: categoriesLoading,
    categories,
    error: categoriesError,
  } = getAllCategories;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(fetchAllCategoriesAction());
    } else {
      history.push("/");
    }
    if (success) {
      toast.success(`${name} created successfully`);
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
  }, [success, deleteSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction({ name }, userInfo.token));
    setName("");
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategoryAction(slug, userInfo.token));
      window.location.reload();
    }
  };

  const searched = (searchKeyword) => (category) =>
    category.name.toLowerCase().includes(searchKeyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 ">
          {error && errorMessage(error)}
          {success && successMessage(success)}
          <h4>Create Category</h4>
          <CategoryForm
            loading={loading}
            setName={setName}
            name={name}
            handleSubmit={handleSubmit}
          />

          <div className="mt-4">
            {console.log("categories", categories)}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Edit / Delete</th>
                </tr>
              </thead>
              {categoriesLoading
                ? loadingSpinner()
                : categoriesError
                ? errorMessage(categoriesError)
                : !categories.length
                ? infoMessage("No Categories Created Yet")
                : categories
                    .filter(searched(keyword))
                    .map((category, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{category.name}</td>
                        <td>
                          <Link
                            className="btn btn-sm btn-primary"
                            to={`/admin/category/edit/${category.slug}`}
                            role="button"
                          >
                            <i className="far fa-edit me-2"></i>Edit
                          </Link>{" "}
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleDelete(category.slug)}
                          >
                            <i className="fas fa-trash-alt me-1"></i>Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
