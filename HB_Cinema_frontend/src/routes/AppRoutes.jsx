import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../pages/user/User";
import Login from "../pages/login/Login";
import Admin from "../pages/admin/Admin";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
