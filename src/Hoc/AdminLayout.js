import React from "react";
import AdminNav from "../Components/admin/nav/AdminNav";


const AdminLayout = (props) => {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right container">
        <div className="py-4">
          <h2>{props.title}</h2>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
