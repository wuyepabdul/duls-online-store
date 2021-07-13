import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalProducts,
  getNewArrivalsProducts,
} from "../../redux/actions/productActions";
import { errorMessage } from "../../helpers/message";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const productsGetNew = useSelector((state) => state.productsGetNew);
  const { error, loading, products } = productsGetNew;

  const productsGetTotal = useSelector((state) => state.productsGetTotal);
  const { loading: totalProductsLoading, totalProducts } = productsGetTotal;

  useEffect(() => {
    loadProducts();
    loadTotalProducts();
  }, [page]);

  const loadTotalProducts = () => {
    dispatch(getTotalProducts());
  };

  const loadProducts = () => {
    const sort = "createdAt";
    const order = "desc";
    dispatch(getNewArrivalsProducts(sort, order, page));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {loading || totalProductsLoading ? (
            <LoadingCard count={4} />
          ) : error ? (
            errorMessage(error)
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="col-xsm-12 col-sm-6 col-md-3 col-lg-3 mt-3"
              >
                <ProductCard product={product} />{" "}
              </div>
            ))
          )}

          {totalProducts && (
            <div className="row">
              <div className="col-md-4 offset-md-4 text-center pt-5 p-3">
                <Pagination
                  defaultCurrent={page}
                  total={(totalProducts / 4) * 10}
                  onChange={(value) => setPage(value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewArrivals;