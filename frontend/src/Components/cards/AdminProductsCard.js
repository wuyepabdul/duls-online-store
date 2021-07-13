import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductsCard = ({ product, handleDelete }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, objectFit: "cover" }}
      cover={
        <img
          alt="product"
          src={
            product.images && product.images.length
              ? product.images[0].url
              : laptop
          }
          className="p-2"
        />
      }
      actions={[
        <Link to={`/admin/product/${product.slug}`}>
          {" "}
          <EditOutlined className="text-info" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleDelete(product.slug)}
        />,
      ]}
    >
      <Meta title={product.title} description={product.description} />
    </Card>
  );
};

export default AdminProductsCard;
