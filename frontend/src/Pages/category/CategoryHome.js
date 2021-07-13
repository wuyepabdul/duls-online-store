import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Components/cards/ProductCard";
import { loadingSpinner } from "../../helpers/loading";
import { errorMessage } from "../../helpers/message";
import { fetchCategorySlugAction } from "../../redux/actions/categoryActions";

const CategoryHome = ({ match }) => {
  const slug = match.params.slug;
  const dispatch = useDispatch();

  const getCategory = useSelector((state) => state.getCategory);
  const { loading, error, category } = getCategory;

  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = () => {
    dispatch(fetchCategorySlugAction(slug));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading || Object.keys(category).length === 0 ? (
            loadingSpinner()
          ) : (
            <h4 className="jumbotron">
              {" "}
              {category.products.length} Products in "{category.category.name}"
              category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {!loading &&
          Object.keys(category).length !== 0 &&
          category.products.map((product) => (
            <div key={product._id} className="col-md-4 mb-3">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryHome;
