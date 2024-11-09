import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const AdminDashboard = () => {
  const navItems = [
    { path: "/dashboard/admin", label: "Dashboard" },
    { path: "/dashboard/add-new-product", label: "Add New Product" },
    { path: "/dashboard/manage-products", label: "Manage Products" },
    { path: "/dashboard/users", label: "Manage Users" },
    { path: "/dashboard/manage-orders", label: "Manage Orders" },
  ];

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  return (
    <div className="space-y-5 md:h-screen mx-5 my-2 flex flex-col justify-between bg-white">
      <div>
        {/* General navigation links */}
        <div className="nav__logo">
          <Link to="/">Galore</Link>
          <p className="text-sm">Admin Dashboard</p>
        </div>
        <ul className="nav__links space-y-5 pt-5">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <a
              href="https://github.com/ih-rakib/Profile/blob/master/Projects/Readme.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pages
            </a>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Divider between general and admin dashboard links */}
        <hr className="mt-5" />

        {/* Admin dashboard-specific links */}
        <ul className="space-y-5 pt-5">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-black"
                }
                end
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-primary font-medium rounded-sm mb-5 px-5 py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
