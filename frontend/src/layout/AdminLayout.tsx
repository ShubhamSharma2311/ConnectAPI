import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout: React.FC = () => {
  return (
    <div className=" bg-gradient-to-r from-navy-blue to-purple-600">
      <AdminNavbar />
      {/* Ensure content starts below the fixed navbar */}
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
