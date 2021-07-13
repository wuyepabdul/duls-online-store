import axios from "axios";

export const fetchAllSub = (token) => {
  try {
    //headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    // send api call
    const { data } = await axios.get("/api/subCategory", config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

//get a single category action
export const fetchSubBySlug = (slug) => {
  try {
    // send api call
    const { data } = await axios.get(`/api/subCategory/${slug}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

//create a category action
export const createSubCategory =
  (formData, token) => async (dispatch, getState) => {
    try {
      //headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      // send api call
      const { data } = await axios.post(`/api/subCategory`, formData, config);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

// update a sub category
export const updateSubCategory = (slug, updatedData, token) => {
  try {
    //headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // send api call
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

// delete a subcategory
export const deleteSubCategory = (slug, token) => {
  try {
    //headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    // send api call
    const { data } = await axios.delete(`/api/subCategory/${slug}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
