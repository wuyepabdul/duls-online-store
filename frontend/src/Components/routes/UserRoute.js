import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import RedirectToHome from "./RedirectToHome";

const UserRoute = ({ children, ...rest }) => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  return userInfo && userInfo.token ? (
    <>
      {" "}
      <Route {...rest} /> {console.log("user token", userInfo)}{" "}
    </>
  ) : (
    <div>
      {" "}
      <RedirectToHome />{" "}
    </div>
  );
};

export default UserRoute;
