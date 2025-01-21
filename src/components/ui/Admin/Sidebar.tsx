import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import adminRoutes from "../../../routes/routeContants";
import { useAppDispatch } from "../../../redux/hooks";
import { logOut } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const toggleDropdown = (routeName: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [routeName]: !prev[routeName],
    }));
  };

  const handleLogout = () => {
    dispatch(logOut())
    toast.success('Logged out')
  };

  return (
    <div className="flex bg-gray-900">
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? "block opacity-100" : "hidden opacity-0"
          } sm:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full  bg-gray-800 shadow-lg transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="px-6 py-4 border-b  border-gray-700 flex items-center justify-between">
            <h1 className="text-xl font-bold  text-gray-300">Admin Panel</h1>
            <button
              className="sm:hidden  text-gray-300"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {adminRoutes.map((routeName, index) => {
                const hasChildren =
                  routeName.children && routeName.children.length > 0;
                return (
                  <li key={index} className="group">
                    <div
                      className={`flex items-center justify-between p-2  text-gray-300 rounded-lg hover:bg-gray-700 transition cursor-pointer ${hasChildren ? "" : "pr-6"
                        } ${pathname.includes(routeName?.path as string) && "bg-gray-700"}`}
                      onClick={
                        hasChildren
                          ? () => toggleDropdown(routeName.name)
                          : undefined
                      }
                    >
                      <div className="flex items-center">
                        {routeName.path ? (
                          <Link
                            to={`/admin/${routeName.path}`}
                            className="ml-3 font-medium"
                            onClick={() => setSidebarOpen(false)} // Close sidebar on mobile
                          >
                            {routeName.name}
                          </Link>
                        ) : (
                          <span className="ml-3 font-medium">
                            {routeName.name}
                          </span>
                        )}
                      </div>
                      {/* Dropdown Icon */}
                      {hasChildren && (
                        <svg
                          className={`w-4 h-4 transform transition-transform ${dropdownOpen[routeName.name]
                            ? "rotate-180"
                            : "rotate-0"
                            }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    {/* Dropdown Menu */}
                    {hasChildren && dropdownOpen[routeName.name] && (
                      <ul className="ml-9 mt-2 space-y-2">
                        {routeName?.children?.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              to={`/admin/${child.path}`}
                              className={`block text-sm  text-gray-400 hover:text-indigo-400 transition ${pathname.includes(child?.path as string) && "text-indigo-400"}`}
                              onClick={() => setSidebarOpen(false)} // Close sidebar on mobile
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t  border-gray-700 px-6 py-4">
            <button
              className="flex items-center  text-gray-400  hover:text-red-400 transition font-medium w-full"
              onClick={handleLogout}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-12V4m0 0h8m-8 0H7"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-300 p-2"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
