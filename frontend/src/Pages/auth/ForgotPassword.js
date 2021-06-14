import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { loadingButton } from "../../helpers/loading";

const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  //component state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo !== null) {
      console.log("userInfo", userInfo);
      history.push("/");
    }
  }, [userInfo]);
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      };
      //send password reset link
      await auth.sendPasswordResetEmail(email, config);
      setLoading(false);
      setEmail("");
      //notify user
      toast.success("Check your email for password reset link");
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

      <div className="d-grid gap-2 mt-4">
        {loading ? (
          loadingButton()
        ) : (
          <button className="btn btn-primary" type="submit" disabled={!email}>
            <i className="far fa-envelope me-2"></i>Get Password Reset Link
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

          <div className="mt-2">
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
