import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../Components/nav/UserNav";
import { auth } from "../../firebase";
import { loadingButton } from "../../helpers/loading";

const UserPassword = () => {
  // state variables
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setPassword("");
        toast.success("Password updated");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const updateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-3">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="form-control border border-top-0 border-end-0 border-start-0 border-bottom-1 border-primary "
          disabled={loading}
        />
      </div>
      <div className="d-grid gap-2 mt-4">
        {loading ? (
          loadingButton()
        ) : (
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading || password.length < 6}
          >
            <i className="fas fa-lock me-2"></i>Update Password
          </button>
        )}
      </div>
    </form>
  );
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 ">
            <h4 className="text-center">Update Password</h4>
            {updateForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPassword;
