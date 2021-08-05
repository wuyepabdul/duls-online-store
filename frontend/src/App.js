import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/nav/Header";
import UserRoute from "./Components/routes/UserRoute";
import AdminRoute from "./Components/routes/AdminRoute";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import Login from "./Pages/auth/Login";
import Home from "./Pages/Home";
import UserHistory from "./Pages/user/UserHistory";
import UserPassword from "./Pages/user/UserPassword";
import UserWishlist from "./Pages/user/UserWishlist";
import CreateCategory from "./Pages/admin/category/CreateCategory";
import UpdateCategory from "./Pages/admin/category/UpdateCategory";
import CreateSubCategory from "./Pages/admin/subCategories/CreateSubCategory";
import RegisterScreen from "./Pages/auth/RegisterScreen";
import UpdateSubCategory from "./Pages/admin/subCategories/UpdateSubCategory";
import ProductCreate from "./Pages/admin/product/ProductCreate";
import ProductUpdate from "./Pages/admin/product/ProductUpdate";
import AllProducts from "./Pages/admin/product/AllProducts";
import Footer from "./Components/footer/Footer";
import Product from "./Pages/Product";
import CategoryHome from "./Pages/category/CategoryHome";
import SubCategoryHome from "./Pages/subCategory/SubCategoryHome";
import Shop from "./Pages/Shop";

const App = () => {
  return (
    <div>
      <div className="main-container">
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
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/subCategory/:slug" component={SubCategoryHome} />
          <Route exact path="/product/:slug" component={Product} />
          <UserRoute exact path="/user/history" component={UserHistory} />
          <UserRoute exact path="/user/password" component={UserPassword} />
          <UserRoute exact path="/user/wishlist" component={UserWishlist} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CreateCategory} />

          <AdminRoute
            exact
            path="/admin/subCategory"
            component={CreateSubCategory}
          />
          <AdminRoute
            exact
            path="/admin/category/edit/:slug"
            component={UpdateCategory}
          />
          <AdminRoute
            exact
            path="/admin/subCategory/edit/:slug"
            component={UpdateSubCategory}
          />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={ProductUpdate}
          />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
