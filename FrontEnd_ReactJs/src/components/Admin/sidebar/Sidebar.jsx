import {
  UserCircleIcon,
  ChartPieIcon,
  FilmIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { removeToken } from "../../../api/localStorage";
import { getMyInfo } from "../../../api/apiUser";
import "./sidebar.css";

export default function SidebarAdmin() {
  const [myInfo, setMyInfo] = useState({});
  const [activeMenu, setActiveMenu] = useState("dashboard"); // Thiết lập trạng thái menu đang hoạt động
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const fetchMyInfo = async () => {
    try {
      const data = await getMyInfo();
      const myInfo = data.result;
      setMyInfo(myInfo);
      console.log(myInfo);
    } catch (error) {
      console.log(error);
    }
  };

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
          <h2 className="text-gray-700">{myInfo.firstName}</h2>
          <p className="text-gray-700">Admin</p>
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
        <NavLink
          to="/admin/schedule"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          onClick={() => setActiveMenu("schedule")}
        >
          <ChartBarIcon className="menu-item-icon" />
          <span className="menu-item-text">Schedule</span>
        </NavLink>
      </div>
    </div>
  );
}
