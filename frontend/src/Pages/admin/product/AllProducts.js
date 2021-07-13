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

const confirm = Modal.confirm;

const AllProducts = () => {
  const dispatch = useDispatch();

  // get all products from store
  const productsGetAll = useSelector((state) => state.productsGetAll);
  const { error, loading, products } = productsGetAll;

  // delete product from store
  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: deleteError,
    success: deleteSuccess,
    product: deletedProduct,
  } = productDelete;

  // on component mount
  useEffect(() => {
    dispatch(getAllProducts(10));
  }, [dispatch, deleteSuccess]);

  //handle delete
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
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <AdminNav />
        </Col>
        <Col className="gutter-row" span={10}>
          <h2>All Products</h2>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {loading
              ? loadingSpinner()
              : error
              ? errorMessage(error)
              : !products.length
              ? errorMessage("No Products Available")
              : products.map((product) => (
                  <Col key={product._id} className="gutter-row" span={6}>
                    {" "}
                    <AdminProductsCard
                      key={product._id}
                      product={product}
                      handleDelete={handleDelete}
                    />{" "}
                  </Col>
                ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AllProducts;
