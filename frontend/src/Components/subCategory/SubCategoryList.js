import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingSpinner } from "../../helpers/loading";
import { fetchAllSub } from "../../redux/actions/subCategoryActions";

const SubCategoryList = () => {
  const dispatch = useDispatch();

  const getAllSubCategories = useSelector((state) => state.getAllSubCategories);
  const { loading, error, subCategories } = getAllSubCategories;

  useEffect(() => {
    dispatch(fetchAllSub());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        {loading
          ? loadingSpinner()
          : subCategories.map((subCategory) => (
              <div
                key={subCategory._id}
                className="col btn btn-outlined-primary btn-lg btn-block m-3"
              >
                <Link to={`/subCategory/${subCategory.slug}`}>
                  {subCategory.name}
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SubCategoryList;
