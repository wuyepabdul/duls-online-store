import React, { useEffect } from "react";
import { listProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import JumbotronText from "../Components/cards/JumbotronText";
import LoadingCard from "../Components/cards/LoadingCard";
import NewArrivals from "../Components/home/NewArrivals";
import TopProducts from "../Components/home/TopProducts";
import CategoriesList from "../Components/category/CategoriesList";

const Home = () => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const { error, loading, products } = productsList;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const sort = "createdAt";
    const order = "desc";
    const limit = 4;
    dispatch(listProducts(sort, order, limit));
  };
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

      <div className="jumbotron display-6 mt-5">Top Products</div>

      {<TopProducts />}

      <div className="jumbotron display-6 mt-5">Categories</div>

      {<CategoriesList />}
    </>
  );
};

export default Home;
