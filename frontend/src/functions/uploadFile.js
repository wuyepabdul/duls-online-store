import axios from "axios";

export const uploadImageFile = async (image, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post("/api/upload/uploadimages", image, config);
  return data;
};

export const removeImageFile = async (imageId, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    "/api/upload/removeimages",
    imageId,
    config
  );

  return data;
};
