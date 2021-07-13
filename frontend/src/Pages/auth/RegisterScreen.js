import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadingSpinner } from "../../helpers/loading";
import { registerAction } from "../../redux/actions/userActions";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.error("All fields are required");
      return;
    } else if (password.length < 6) {
      toast.error("Password length must be greater that 5 characters");
      return;
    } else {
      const userData = { email, password, name };
      dispatch(registerAction(userData));
    }
  };

  const registrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
        />
      </div>
      <div className="form-outline mt-4">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
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
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!email || password.length < 6 || !name}
        >
          Register
        </button>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row ">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center"> Create Account</h4>
          {loading && loadingSpinner()}
          {error && toast.error("An Error Occured")}
          {registrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
