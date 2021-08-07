import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrap, WrapItem, Center, GridItem, Grid, Text } from "@chakra-ui/react";
import ProductCard from "../Components/cards/ProductCard";
import { loadingSpinner } from "../helpers/loading";
import { errorMessage } from "../helpers/message";
import { useState } from "react";
import {
  listAllProductsByCount,
  searchProductQuery,
} from "../functions/product";

const Shop = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchQuery = useSelector((state) => state.searchQuery);
  const { text } = searchQuery;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    listAllProductsByCount(12)
      .then((data) => {
        setLoading(false);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchSearchedProducts(text);
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  const fetchSearchedProducts = (query) => {
    searchProductQuery(query)
      .then((data) => {
        setLoading(true);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={3}>
        <GridItem
          className="pt-3 pb-3"
          rowSpan={2}
          colSpan={1}
          bg="#f5f5f4"
          style={{ height: "100%" }}
        >
          {" "}
          <Center> Search/Filter</Center>
        </GridItem>
        <GridItem colSpan={4}>
          <Wrap
            className="pt-3 pb-3"
            spacing="30px"
            justify="center"
            align="center"
          >
            {error && errorMessage(error)}
            {!products ? (
              loadingSpinner()
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <WrapItem key={product._id}>
                  <ProductCard product={product} />
                </WrapItem>
              ))
            ) : (
              <Text fontSize="5xl">No Products</Text>
            )}
          </Wrap>
        </GridItem>
      </Grid>
    </>
  );
};

export default Shop;
