import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../Admincomponents/AdminNavbar";

const AdminLayout: React.FC = () => {
  return (
    <div className=" bg-gradient-to-r from-gray-900 to-gray-700">
      <AdminNavbar />
      {/* Ensure content starts below the fixed navbar */}
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
