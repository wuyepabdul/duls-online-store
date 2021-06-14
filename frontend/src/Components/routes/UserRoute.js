import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import RedirectToHome from "./RedirectToHome";

const UserRoute = ({ children, ...rest }) => {
  const userInfo = useSelector((state) => state.userInfo);

  return userInfo && userInfo.userInfo.token ? (
    <Route {...rest} />
  ) : (
    <div>
      {" "}
      <RedirectToHome />{" "}
    </div>
  );
};

export default UserRoute;
