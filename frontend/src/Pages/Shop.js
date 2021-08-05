import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Wrap,
  WrapItem,
  Center,
  Stack,
  GridItem,
  Grid,
  VStack,
  Container,
} from "@chakra-ui/react";
import ProductCard from "../Components/cards/ProductCard";
import LoadingCard from "../Components/cards/LoadingCard";
import { errorMessage } from "../helpers/message";
import { getAllProducts } from "../redux/actions/productActions";

const Shop = () => {
  const dispatch = useDispatch();

  const productsGetAll = useSelector((state) => state.productsGetAll);
  const { error, loading, products } = productsGetAll;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {console.log("products", products)}
      <Grid templateColumns="repeat(5, 1fr)" gap={3}>
        <GridItem className="pt-3 pb-3" rowSpan={2} colSpan={1} bg="#f5f5f4">
          {" "}
          <Center> Search/Filter</Center>
        </GridItem>
        <GridItem colSpan={4} bg="blue">
          <Wrap
            className="pt-3 pb-3"
            spacing="30px"
            justify="center"
            align="center"
          >
            {loading ? (
              <LoadingCard />
            ) : error ? (
              errorMessage(error)
            ) : (
              products.map((product) => (
                <WrapItem>
                  <ProductCard key={product._id} product={product} />
                </WrapItem>
              ))
            )}
          </Wrap>
        </GridItem>
      </Grid>
    </>
  );
};

export default Shop;
