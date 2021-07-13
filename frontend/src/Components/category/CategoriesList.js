import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoriesAction } from "../../redux/actions/categoryActions";
import { loadingSpinner } from "../../helpers/loading";

const CategoriesList = () => {
  const dispatch = useDispatch();

  const getAllCategories = useSelector((state) => state.getAllCategories);
  const { loading, error, categories } = getAllCategories;

  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  const showCategories = () => {};
  return (
    <div className="container">
      {console.log("categories", categories)}
      <div className="row">
        {loading
          ? loadingSpinner()
          : categories.map((category) => (
              <div
                key={category._id}
                className="col btn btn-outlined-primary btn-lg btn-block m-3"
              >
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CategoriesList;
