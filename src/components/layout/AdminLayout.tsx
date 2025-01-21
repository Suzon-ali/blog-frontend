import Sidebar from "../ui/Admin/Sidebar";
import Login from "../../pages/Login";

const AdminLayout = () => {
  const role = 'admin';
  return <div className="w-full h-screen bg-slate-800/95 text-white ">{role === "admin" ? <Sidebar /> : <Login />}</div>;
};

export default AdminLayout;
