import { Outlet } from "react-router-dom"
import AdminNavbar from "../Admincomponents/AdminNavbar"


const MyApiLayout = () => {
  return (
    <div className=" bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen">
        <AdminNavbar/>
        <Outlet/>
    </div>
  )
}

export default MyApiLayout