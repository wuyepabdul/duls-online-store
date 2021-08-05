import React from "react";
import JumbotronText from "../Components/cards/JumbotronText";
import NewArrivals from "../Components/home/NewArrivals";
import TopProducts from "../Components/home/TopProducts";
import CategoriesList from "../Components/category/CategoriesList";
import SubCategoryList from "../Components/subCategory/SubCategoryList";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-center h1 font-weight-bold text-warning">
        {" "}
        {
          <JumbotronText
            text={["Latest Products", "New Arrivals", "Best Sellers"]}
          />
        }
      </div>

      <div className="jumbotron display-6 mt-5 ">New Arrivals</div>

      {<NewArrivals />}

      <div className="jumbotron display-6 mt-5 mb-3">Top Products</div>

      {<TopProducts />}

      <div className="jumbotron display-6 mt-5">Categories</div>

      {<CategoriesList />}

      <div className="jumbotron display-6 mt-5">Sub Categories</div>

      {<SubCategoryList />}
    </>
  );
};

export default Home;
