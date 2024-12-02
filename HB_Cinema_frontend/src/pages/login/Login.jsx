import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../../api/localStorage";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { jwtDecode } from "jwt-decode";
import { login } from "../../api/authService";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const token = getToken();
    handleTokenRedirect(token);
  }, [navigate]);

  const handleTokenRedirect = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.scope;
      if (userRole === "ROLE_ADMIN") {
        navigate("/admin/user");
      } else {
        navigate("/");
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Validation for empty username
  if (!username.trim()) {
    setError("Username cannot be empty");
    return;
  }
  // Validation for password length
  if (password.length < 5) {
    setError("Password must be at least 8 characters long");
    return;
  }
    try {
      setError(null);
      const data = await login(username, password);
      console.log(data);  
      const token = getToken();
      handleTokenRedirect(token);
    } catch (error) {
      console.error("Error login:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo-login" />
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="login-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-sm">
              <input
                type="checkbox"
                className="form-checkbox text-orange-500 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-orange-500 text-sm">
              Forgot password?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} 
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <div className="my-6 text-center text-gray-400">or</div>
        <div className="space-y-3">
          <button className="social-button google-button">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          <button className="social-button facebook-button">
            <FaFacebookF className="mr-2" /> Sign in with Facebook
          </button>
        </div>
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/sign_up"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign up now!
          </Link>
        </p>
      </div>
    </div>
  );
}
