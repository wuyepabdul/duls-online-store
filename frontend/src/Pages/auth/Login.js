import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { loadingButton } from "../../helpers/loading";
import { createOrUpdateUser } from "../../redux/actions/userActions";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  //component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // user info from store
  const userInfo = useSelector((state) => state.userInfo);

  //redirect if user is logged In
  useEffect(() => {
    if (userInfo !== null) {
      history.push("/");
    }
  }, [userInfo]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      //dispatch login action
      dispatch(createOrUpdateUser(idTokenResult.token, user.name));

      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  //handle login with Google
  const handleLoginWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      //dispatch login action
      dispatch(createOrUpdateUser(idTokenResult.token, user.name));

      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const registerForm = () => (
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
          <h4 className="text-center">Login</h4>
          {registerForm()}
          <div className="d-grid gap-2 mt-4">
            <button
              onClick={handleLoginWithGoogle}
              className="btn btn-danger"
              role="button"
            >
              <i className="fab fa-google me-2"></i>Login with Google Account
            </button>
          </div>
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
