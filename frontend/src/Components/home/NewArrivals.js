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
import { VStack, Wrap } from "@chakra-ui/react";

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
      <VStack>
        <Wrap spacing="30px" justify="center">
          {loading ? (
            <LoadingCard count={3} />
          ) : error ? (
            errorMessage(error)
          ) : (
            products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </Wrap>{" "}
        {totalProductsLoading ? (
          ""
        ) : (
          <Pagination
            defaultCurrent={page}
            total={(totalProducts / 4) * 10}
            onChange={(value) => setPage(value)}
          />
        )}
      </VStack>
    </>
  );
};

export default NewArrivals;
