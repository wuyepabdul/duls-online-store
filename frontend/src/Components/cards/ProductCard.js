import React from "react";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import showAverageRating from "../../functions/averageRating";
import { Center, VStack } from "@chakra-ui/react";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  return (
    <VStack>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverageRating(product)
      ) : (
        <div className="text-center pt-3"> No rating Yet </div>
      )}
      <Center>
        {" "}
        <Card
          hoverable
          style={{ width: 240, objectFit: "cover" }}
          cover={
            <Link to={`/product/${product.slug}`}>
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
            </Link>
          }
          actions={[
            <Link to={`/product/${product.slug}`}>
              {" "}
              <EyeOutlined className="text-info" /> <br /> View Product
            </Link>,
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </>,
          ]}
        >
          <Meta
            title={
              <span>
                {product.title} - &#8358;{product.price}
              </span>
            }
            description={product.description}
          />
        </Card>
      </Center>
    </VStack>
  );
};

export default ProductCard;
