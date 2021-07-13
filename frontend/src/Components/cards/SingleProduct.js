import React from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../images/laptop.jpg";
import { Card, Tabs } from "antd";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import showAverageRating from "../../functions/averageRating";

const { TabPane } = Tabs;
const SingleProduct = ({ product, onRatingStarClicked, star }) => {
  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {product.images && product.images.length ? (
            product.images &&
            product.images.map((image) => (
              <img key={image.public_id} src={image.url} />
            ))
          ) : (
            <Card cover={<img src={defaultImage} />} className=" mb-3"></Card>
          )}
        </Carousel>
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {product.description && product.description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxx xxxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="">{product.title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverageRating(product)
        ) : (
          <div className="text-center pt-1 pb-3"> No rating Yet </div>
        )}
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </>,
            <Link to="#">
              {" "}
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={product._id}
                numberOfStars={5}
                rating={star}
                changeRating={onRatingStarClicked}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
