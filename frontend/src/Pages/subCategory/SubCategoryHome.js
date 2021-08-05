import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Components/cards/ProductCard";
import { loadingSpinner } from "../../helpers/loading";
import { errorMessage } from "../../helpers/message";
import { fetchSubBySlug } from "../../redux/actions/subCategoryActions";

const SubCategoryHome = ({ match }) => {
  const slug = match.params.slug;
  const dispatch = useDispatch();

  const getSubCategory = useSelector((state) => state.getSubCategory);
  const { loading, error, subCategory } = getSubCategory;

  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = () => {
    dispatch(fetchSubBySlug(slug));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading || Object.keys(subCategory).length === 0 ? (
            loadingSpinner()
          ) : (
            <h4 className="jumbotron">
              {" "}
              {subCategory.products.length} Products in "
              {subCategory.subCategory.name}" sub category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {!loading &&
          Object.keys(subCategory).length !== 0 &&
          subCategory.products.map((product) => (
            <div key={product._id} className="col-md-4 mb-3">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubCategoryHome;
