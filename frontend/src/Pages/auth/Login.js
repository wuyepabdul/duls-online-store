import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadingButton, loadingSpinner } from "../../helpers/loading";
import { errorMessage } from "../../helpers/message";
import { loginAction } from "../../redux/actions/userActions";

const Login = ({ history }) => {
  let intendedPage = history.location.state;

  const dispatch = useDispatch();

  const [email, setEmail] = useState("wuyepabdul@gmail.com");
  const [password, setPassword] = useState("123456");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginAction(userData));
    if (intendedPage) {
      history.push(intendedPage.from);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
          placeholder="Email"
          autoFocus
        />
      </div>
      <div className="form-outline mt-3">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
        />
      </div>
      <div className="d-grid gap-2 mt-4">
        {loading ? (
          loadingButton()
        ) : (
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!email || password.length < 6}
          >
            <i className="far fa-envelope me-2"></i>Login with Email / Password
          </button>
        )}
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row ">
        <div className="col-md-6 offset-md-3">
          {error && errorMessage(error)}
          {loading && loadingSpinner()}
          <h4 className="text-center">Login</h4>
          {loginForm()}

          <div className="mt-2">
            Don't have an account ? <Link to="/register">Create one</Link>
          </div>

          <Link className=" mt-1 " to="/forgotPassword">
            {" "}
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
