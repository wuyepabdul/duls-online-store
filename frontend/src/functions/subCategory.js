import axios from "axios";

export const fetchAllSub = async () => {
  try {
    const { data } = await axios.get("/api/subCategory");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSubBySlug = async (slug) => {
  try {
    const { data } = await axios.get(`/api/subCategory/${slug}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createSubCategory =
  (formData, token) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`/api/subCategory`, formData, config);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateSubCategory = async (slug, updatedData, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/subCategory/${slug}`,
      updatedData,
      config
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSubCategory = async (slug, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/subCategory/${slug}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
