import { Outlet } from "react-router-dom"
import AdminNavbar from "../Admincomponents/AdminNavbar"


const MyApiLayout = () => {
  return (
    <div className=" bg-gradient-to-r from-navy-blue to-purple-600 min-h-screen">
        <AdminNavbar/>
        <Outlet/>
    </div>
  )
}

export default MyApiLayout