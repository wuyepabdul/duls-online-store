import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const Register = ({ history }) => {
  //component state
  const [email, setEmail] = useState("");

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

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Verification link has been sent to ${email}. Verify your email to complete registration`
    );

    // save user email to local storage
    localStorage.setItem("registration email", email);

    // clear input field
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline">
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
        <button className="btn btn-primary" type="submit" disabled={!email}>
          Register
        </button>
        <div>
          Have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row ">
        <div className="col-md-5 offset-md-3">
          <h4 className="text-center">Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
