import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from '../routes/Admin';
import User from "./User";
import Login from "../pages/login/Login";


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
