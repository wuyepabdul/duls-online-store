import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import showAverageRating from "../../functions/averageRating";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  return (
    <>
      {" "}
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverageRating(product)
      ) : (
        <div className="text-center pt-1 pb-3"> No rating Yet </div>
      )}
      <Card
        hoverable
        style={{ width: 240, objectFit: "cover" }}
        cover={
          <img
            alt="product"
            style={{ height: 200 }}
            src={
              product.images && product.images.length
                ? product.images[0].url
                : laptop
            }
            className="image-fit p-2"
          />
        }
        actions={[
          <Link to={`/product/${product.slug}`}>
            {" "}
            <EyeOutlined className="text-info" /> <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-success" /> <br /> Add to Cart
          </>,
        ]}
      >
        <Meta title={product.title} description={product.description} />
      </Card>
    </>
  );
};

export default ProductCard;
