import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentAdminUser } from "../../redux/actions/userActions";
import RedirectToHome from "./RedirectToHome";

const AdminRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo && userInfo.role === "admin" ? (
    <Route {...rest} />
  ) : (
    <div>
      <RedirectToHome />
    </div>
  );
};

export default AdminRoute;
