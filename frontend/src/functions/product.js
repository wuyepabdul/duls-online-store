import axios from "axios";

// create a product
export const searchProductQuery = async (searchQuery) => {
  try {
    const { data } = await axios.post(
      `/api/product/searchfilters`,
      searchQuery
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const listAllProductsByCount = async (count) => {
  try {
    const { data } = await axios.get(`/api/product/listall/${count}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
