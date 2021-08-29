import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Wrap,
  WrapItem,
  Center,
  GridItem,
  Grid,
  Text,
  Badge,
} from "@chakra-ui/react";
import ProductCard from "../Components/cards/ProductCard";
import { loadingSpinner } from "../helpers/loading";
import { errorMessage } from "../helpers/message";
import { useState } from "react";
import {
  listAllProductsByCount,
  searchProductQuery,
} from "../functions/product";
import { Menu, Slider, Checkbox } from "antd";
import { SEARCH_QUERY } from "../redux/constants/searchConstants";
import { fetchAllCategories } from "../functions/category";
import { DownSquareOutlined } from "@ant-design/icons";
import { fetchAllSub } from "../functions/subCategory";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sub, setSub] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [ok, setOk] = useState(false);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  const searchQuery = useSelector((state) => state.searchQuery);
  const { text } = searchQuery;

  useEffect(() => {
    loadAllProducts();
    loadFetchedSubCategories();
    loadFetchedCategories();
  }, [dispatch]);

  const loadAllProducts = () => {
    listAllProductsByCount(12)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log("error", err);
        setError(err.message);
      });
  };

  const loadFetchedCategories = () => {
    fetchAllCategories()
      .then((data) => {
        console.log("data", data);
        setCategories(data);
      })
      .catch((error) => console.log(error));
  };

  const loadFetchedSubCategories = () => {
    fetchAllSub()
      .then((data) => {
        console.log("sub categories", data);
        setSubCategories(data);
      })
      .catch((error) => console.log("subCategory error", error));
  };

  const fetchSearchedProducts = (query) => {
    searchProductQuery(query)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log("error", err);
        setError(err.message);
      });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchSearchedProducts({ query: text });
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    console.log("ok");
    fetchSearchedProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({ type: SEARCH_QUERY, payload: { text: "" } });
    setPrice(value);
    setCategoryIds([]);
    setSub("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () =>
    categories.length &&
    categories.map((category) => (
      <div style={{ paddingLeft: "1.5rem" }} key={category._id}>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          value={category._id}
          name="category"
          onChange={onCheckChange}
          checked={categoryIds.includes(category._id)}
        >
          {category.name}
        </Checkbox>{" "}
      </div>
    ));

  const onCheckChange = (e) => {
    dispatch({ type: SEARCH_QUERY, payload: { text: "" } });
    setPrice([0, 0]);
    setSub("");
    let searchQueryInState = [...categoryIds];
    let justChecked = e.target.value;
    let categoryInState = searchQueryInState.indexOf(justChecked);

    if (categoryInState === -1) {
      searchQueryInState.push(justChecked);
    } else {
      searchQueryInState.splice(categoryInState, 1);
    }
    setCategoryIds(searchQueryInState);
    fetchSearchedProducts({ category: searchQueryInState });
  };

  const showSubCategories = () =>
    subCategories.length &&
    subCategories.map((sub) => (
      <Badge
        key={sub._id}
        variant="solid"
        className="px-2 py-2 mx-2 my-2 "
        onClick={() => handleSubCategory(sub)}
        style={{ cursor: "pointer" }}
      >
        {" "}
        {sub.name}{" "}
      </Badge>
    ));

  const handleSubCategory = (subCategory) => {
    setSub(subCategory);
    dispatch({ type: SEARCH_QUERY, payload: { text: "" } });
    setPrice([0, 0]);
    setCategories([]);

    fetchSearchedProducts({ subCategory });
  };

  return (
    <>
      {console.log("subs", subCategories)}
      <Grid templateColumns="repeat(5, 1fr)" gap={3}>
        <GridItem className="pt-3 pb-3" rowSpan={2} colSpan={1} bg="#f5f5f4">
          {" "}
          <Center>
            {" "}
            <h4>Search/Filter</h4>
          </Center>
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
            {/* slider */}
            <SubMenu key="1" title={<span className="h6">&#8358; Price</span>}>
              <div style={{ paddingLeft: "1.5rem" }}>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(value) => value}
                  min={1}
                  max={10000}
                  range
                  value={price}
                  onChange={handleSlider}
                />
              </div>
            </SubMenu>

            {/* categories */}
            <SubMenu
              key="2"
              title={
                <div style={{ paddingLeft: "0rem" }}>
                  <DownSquareOutlined /> Category
                </div>
              }
            >
              {showCategories()}
            </SubMenu>

            {/* subcategories */}
            <SubMenu
              key="3"
              title={
                <div className="pl-4 pr-4" style={{ paddingLeft: "0rem" }}>
                  <DownSquareOutlined /> SubCategories
                </div>
              }
            >
              {showSubCategories()}
            </SubMenu>
          </Menu>
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
