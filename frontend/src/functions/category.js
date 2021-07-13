import axios from "axios";

export const fetchSubCategoriesOfCategory = async (categoryId) => {
  const { data } = await axios.get(`/api/category/sub/${categoryId}`);

  return data;
};

export const fetchAllCategories = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get("/api/category", config);
  return data;
};
