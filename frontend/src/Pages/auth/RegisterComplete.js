import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../redux/actions/userActions";

const RegisterComplete = ({ history }) => {
  const dispatch = useDispatch();
  //component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // user info from store
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    setEmail(localStorage.getItem("registration email"));
  }, []);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validations
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password length must be greater that 5 characters");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //remove user email from localstorage
        localStorage.removeItem("registration email");

        //update user password
        let user = auth.currentUser;
        await user.updatePassword(password);

        // get user token
        const idTokenResult = await user.getIdTokenResult();
        //dispatch login action
        console.log("reg_complete user", user);
        dispatch(createOrUpdateUser(idTokenResult.token, user.name));

        //redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
          disabled
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
          autoFocus
        />
      </div>
      <div className="d-grid gap-2 mt-4">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!email || password.length < 6}
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row ">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center">Complete Registration</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
