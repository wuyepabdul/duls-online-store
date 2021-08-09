import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductsCard from "../../../Components/cards/AdminProductsCard";
import AdminNav from "../../../Components/nav/AdminNav";
import { loadingSpinner } from "../../../helpers/loading";
import { errorMessage } from "../../../helpers/message";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/actions/productActions";
import { Modal, Button, Row, Col, Divider } from "antd";
import { Wrap, WrapItem, Center, GridItem, Grid, Text } from "@chakra-ui/react";

const confirm = Modal.confirm;

const AllProducts = () => {
  const dispatch = useDispatch();

  const productsGetAll = useSelector((state) => state.productsGetAll);
  const { error, loading, products } = productsGetAll;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: deleteError,
    success: deleteSuccess,
    product: deletedProduct,
  } = productDelete;

  useEffect(() => {
    dispatch(getAllProducts(10));
  }, [dispatch, deleteSuccess]);

  const handleDelete = (slug) => {
    confirm({
      title: "Are you sure to delete product?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK", slug);
        dispatch(deleteProduct(slug)).then((res) => {
          toast.warning(`${res.payload.title} deleted`);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="container-fluid">
      <Grid templateColumns="repeat(5, 1fr)" gap={3}>
        <GridItem
          className="pt-3 pb-3"
          rowSpan={2}
          colSpan={1}
          bg="#f5f5f4"
          style={{ height: "100%" }}
        >
          <AdminNav />
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
                  <AdminProductsCard
                    key={product._id}
                    product={product}
                    handleDelete={handleDelete}
                  />
                </WrapItem>
              ))
            ) : (
              <Text fontSize="5xl">No Products</Text>
            )}
          </Wrap>
        </GridItem>
      </Grid>
    </div>
  );
};

export default AllProducts;
