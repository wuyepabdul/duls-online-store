import React from "react";
import AdminNav from "../../Components/nav/AdminNav";
const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <div className="row">
            <h2>All Products</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
