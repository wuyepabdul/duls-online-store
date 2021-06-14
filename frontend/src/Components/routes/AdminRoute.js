import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentAdminUser } from "../../redux/actions/userActions";
import RedirectToHome from "./RedirectToHome";

const AdminRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      if (userInfo && userInfo.userInfo.token) {
        dispatch(getCurrentAdminUser(userInfo.userInfo.token));
        setIsAdmin(true);
      }
    } catch (error) {
      setIsAdmin(false);
      console.log(error.message);
      toast.error(error.message);
    }
  }, [userInfo]);

  return isAdmin ? (
    <Route {...rest} />
  ) : (
    <div>
      <RedirectToHome />
    </div>
  );
};

export default AdminRoute;
