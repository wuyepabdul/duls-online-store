import React from "react";
import UserNav from "../../Components/nav/UserNav";

const UserWishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User Wishlist page</div>
      </div>
    </div>
  );
};

export default UserWishlist;
