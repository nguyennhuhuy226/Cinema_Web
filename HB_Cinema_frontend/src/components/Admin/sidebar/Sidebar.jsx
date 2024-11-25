import {
  UserCircleIcon,
  ChartPieIcon,
  FilmIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom"; 
import { removeToken } from "../../../api/localStorage";
import "./sidebar.css";

export default function SidebarAdmin() {
  const [activeMenu, setActiveMenu] = useState("dashboard"); // Thiết lập trạng thái menu đang hoạt động
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // Gọi hàm logout của bạn ở đây
    navigate("/login");
  };

  return (
    <div className="sidebar sidebar-container">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Profile Section */}
      <div className="sidebar-profile">
        <UserCircleIcon className="profile-icon" />
        <div className="profile-text">
          <h2>NguyenNhu</h2>
          <p>Admin</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="h-4 w-4" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="menu-items">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          onClick={() => setActiveMenu("dashboard")}
        >
          <ChartPieIcon className="menu-item-icon" />
          <span className="menu-item-text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/user"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          onClick={() => setActiveMenu("customers")}
        >
          <UserCircleIcon className="menu-item-icon" />
          <span className="menu-item-text">Customers</span>
        </NavLink>

        <NavLink
          to="/admin/movie"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          onClick={() => setActiveMenu("movie")}
        >
          <FilmIcon className="menu-item-icon" />
          <span className="menu-item-text">Movies</span>
        </NavLink>

        <NavLink
          to="/admin/branch"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          onClick={() => setActiveMenu("branch")}
        >
          <ChartBarIcon className="menu-item-icon" />
          <span className="menu-item-text">Branch</span>
        </NavLink>
      </div>
    </div>
  );
}
