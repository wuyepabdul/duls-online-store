import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/nav/Header";
import UserRoute from "./Components/routes/UserRoute";
import AdminRoute from "./Components/routes/AdminRoute";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import RegisterComplete from "./Pages/auth/RegisterComplete";
import Home from "./Pages/Home";
import UserHistory from "./Pages/user/UserHistory";
import UserPassword from "./Pages/user/UserPassword";
import UserWishlist from "./Pages/user/UserWishlist";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={UserHistory} />
        <UserRoute exact path="/user/password" component={UserPassword} />
        <UserRoute exact path="/user/wishlist" component={UserWishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </>
  );
};

export default App;
