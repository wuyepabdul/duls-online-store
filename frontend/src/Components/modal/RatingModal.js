import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const history = useHistory();
  const { slug } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    if (userInfo && userInfo.token) {
      setShowModal(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />
        {userInfo ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave Your Rating"
        centered
        visible={showModal}
        onOk={() => {
          setShowModal(false);
          toast.success("Thank You. Your Review has been submitted");
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
