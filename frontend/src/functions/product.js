import axios from "axios";

// create a product
export const createProduct = async (product, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`/api/product`, product, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// fetch all products
export const listProductsByCount = async (count) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/product/listall/${count}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// get a product
export const getProduct = async (slug, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/product/${slug} `, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// delete a product
export const deleteProduct = async (slug, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/product/${slug} `, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
