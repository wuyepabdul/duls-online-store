import React from "react";
import UserNav from "../../Components/nav/UserNav";

const UserHistory = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User histroy page</div>
      </div>
    </div>
  );
};

export default UserHistory;
