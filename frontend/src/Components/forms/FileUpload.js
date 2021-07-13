import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { removeFile } from "../../redux/actions/uploadAction";
import { Avatar, Badge } from "antd";
import { loadingButton, loadingSpinner } from "../../helpers/loading";
import { uploadImageFile } from "../../functions/uploadFile";
import { toast } from "react-toastify";

const FileUpload = ({ values, setValues, success, uploadImgLoading }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const imageDelete = useSelector((state) => state.imageDelete);
  const { loading: deleteImgLoading } = imageDelete;

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadFiles = values.images;
    for (let i = 0; i < files.length; i++) {
      Resizer.imageFileResizer(
        files[i],
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          const imageFile = { image: uri };
          uploadImageFile(imageFile, userInfo.token)
            .then((res) => {
              console.log("response", res);
              allUploadFiles.push(res);
              setValues({ ...values, images: allUploadFiles });
            })
            .catch((error) => {
              console.log(error);

              toast.error(error.message);
            });
        },
        "base64"
      );
    }
  };

  const handleImageRemove = (id) => {
    let image_id = { public_id: id };

    dispatch(removeFile(image_id)).then((result) => {
      const { images } = values;
      let filteredImages = images.filter((img) => {
        return img.public_id !== id;
      });
      setValues({ ...values, images: filteredImages });
    });
  };
  return (
    <div>
      {uploadImgLoading || deleteImgLoading ? (
        loadingSpinner()
      ) : (
        <div className="form-group mb-3">
          <label className="form-label btn btn-primary">
            Choose Image
            <input
              type="file"
              multiple
              hidden
              accept="images/*"
              onChange={fileUploadAndResize}
              className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary"
            />
          </label>
        </div>
      )}
      {values.images &&
        values.images.map((image) => (
          <Badge
            key={image.public_id}
            count="X"
            onClick={() => handleImageRemove(image.public_id)}
            className="m-2"
            style={{ cursor: "pointer" }}
          >
            <Avatar src={image.url} size={100} shape="square" />
          </Badge>
        ))}
    </div>
  );
};

export default FileUpload;
