import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "../Components/cards/SingleProduct";
import { errorMessage } from "../helpers/message";
import {
  getProduct,
  listRelatedProductsAction,
  rateProductAction,
} from "../redux/actions/productActions";
import { loadingSpinner } from "../helpers/loading";
import { toast } from "react-toastify";
import { RATE_PRODUCT_RESET } from "../redux/constants/productConstants";
import ProductCard from "../Components/cards/ProductCard";

const Product = ({ match }) => {
  const slug = match.params.slug;
  const dispatch = useDispatch();

  const [star, setStar] = useState(0);

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const productRate = useSelector((state) => state.productRate);
  const {
    loading: ratingLoading,
    error: ratingError,
    success: ratingSuccess,
    rating,
  } = productRate;

  const productGet = useSelector((state) => state.productGet);
  const { loading, error, product } = productGet;

  const productsListRelated = useSelector((state) => state.productsListRelated);
  const {
    loading: loadingRelated,
    error: errorRelated,
    products: relatedProducts,
  } = productsListRelated;

  useEffect(() => {
    loadProduct();
    if (ratingSuccess) {
      toast.success("Your review has been sent. Thank you");
      dispatch({ type: RATE_PRODUCT_RESET });
    }
    if (ratingError) {
      toast.error(ratingError);
      dispatch({ type: RATE_PRODUCT_RESET });
    }
  }, [ratingSuccess, ratingError, dispatch]);

  useEffect(() => {
    if (product) dispatch(listRelatedProductsAction(product._id));

    if (product && userInfo) {
      let existingRating = product.ratings.find(
        (rating) => rating.postedBy.toString() === userInfo._id.toString()
      );

      existingRating && setStar(existingRating.star);
    }
  }, [product, userInfo, dispatch]);

  const loadProduct = () => {
    dispatch(getProduct(slug));
  };

  const onRatingStarClicked = (newRating, productId) => {
    setStar(newRating);
    dispatch(rateProductAction(productId, newRating));
  };
  return (
    <div className="container-fluid">
      <div>Products</div>
      <div className="row pt-4">
        {!product ? (
          loadingSpinner()
        ) : error ? (
          errorMessage(error)
        ) : (
          <SingleProduct
            product={product}
            onRatingStarClicked={onRatingStarClicked}
            star={star}
          />
        )}
      </div>
      <div className="row ">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className="row center-items">
        {relatedProducts && relatedProducts.length ? (
          relatedProducts.map((product) => (
            <div key={product._id} className="col-md-4 col-sm-6 col-xs-12">
              {console.log("product", product)}
              {<ProductCard product={product} />}{" "}
            </div>
          ))
        ) : (
          <div className="text-center display-6"> No Related Products </div>
        )}
      </div>
    </div>
  );
};

export default Product;
