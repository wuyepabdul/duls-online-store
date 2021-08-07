import axios from "axios";

// create a product
export const searchProductQuery = async (query) => {
  try {
    const { data } = await axios.post(`/api/product/searchfilters`, { query });
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
