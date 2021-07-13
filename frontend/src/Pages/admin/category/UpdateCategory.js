import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingSpinner } from "../../../helpers/loading";
import {
  fetchCategorySlugAction,
  updateCategoryAction,
} from "../../../redux/actions/categoryActions";
import CategoryUpdate from "../../../Components/forms/CategoryUpdate.js";

const UpdateCategory = ({ history, match }) => {
  const slug = match.params.slug;
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  // user info from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // create categogry from store
  const updateCategory = useSelector((state) => state.updateCategory);
  const { loading } = updateCategory;

  // fetch category by id
  const getCategory = useSelector((state) => state.getCategory);
  const {
    loading: categoryLoading,
    category,
    error: categoryError,
  } = getCategory;

  useEffect(() => {
    loadCategory();
  }, []);

  // loadCategory function
  const loadCategory = () => {
    dispatch(fetchCategorySlugAction(slug))
      .then((response) => {
        setName(response.payload.name);
      })
      .catch((err) => console.log("err", err));
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction(slug, { name }, userInfo.token))
      .then((response) => {
        console.log(response);
        toast.success(`${name} updated successFully`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error occured updating ${name}`);
        history.push("/admin/category");
      });
    //
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 ">
          <h4>Update Category</h4>
          {categoryLoading ? (
            loadingSpinner()
          ) : (
            <CategoryUpdate
              loading={loading}
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
