import React, { useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import Search from "../forms/Search";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = async () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Duls-Online-Shop
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/shop">
                Shop
              </NavLink>
            </li>
          </ul>
          {/* <Search /> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!userInfo ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Signup
                  </NavLink>
                </li>{" "}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <div className="dropdown shadow-0">
                    <NavLink
                      className="btn btn-light dropdown-toggle shadow-0"
                      to="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userInfo.email && userInfo.email.split("@")[0]}
                    </NavLink>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {userInfo.role === "admin" ? (
                        <>
                          {" "}
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/admin/dashboard"
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/admin/wishlist"
                            >
                              Wishlist
                            </NavLink>
                          </li>{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/user/history"
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/user/wishlist"
                            >
                              Wishlist
                            </NavLink>
                          </li>
                        </>
                      )}

                      <li>
                        <NavLink
                          onClick={logoutHandler}
                          className="dropdown-item"
                          to="#"
                        >
                          Log out
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
