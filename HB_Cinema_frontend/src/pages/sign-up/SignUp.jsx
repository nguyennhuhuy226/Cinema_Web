import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import "./sign-up.css";
import { addUser } from "../../api/apiUser";
import { jwtDecode } from "jwt-decode";
import { login } from "../../api/authService";
import { getToken } from "../../api/localStorage";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTokenRedirect = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.scope;
      if (userRole === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  // Hàm kiểm tra định dạng email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Kiểm tra điều kiện đầu vào
    if (!email) {
      setError("Email cannot be empty.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!username) {
      setError("Username cannot be empty.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = { email, username, password };

    try {
      setError(null);
      setSuccess(false);
      const result = await addUser(newUser);
      const data = await login(username, password);
      const token = getToken();
      handleTokenRedirect(token);
      console.log("User added successfully:", result);
      setSuccess(true);
    } catch (error) {
      console.error("Error adding user:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="login-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">
              User registered successfully!
            </p>
          )}
          <button type="submit" className="login-button">
            SIGN UP
          </button>
        </form>
        <div className="my-6 text-center text-gray-400">or</div>
        <div className="space-y-3">
          <button className="social-button google-button">
            <FaGoogle className="mr-2" /> Sign up with Google
          </button>
          <button className="social-button facebook-button">
            <FaFacebookF className="mr-2" /> Sign up with Facebook
          </button>
        </div>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login in here!
          </Link>
        </p>
      </div>
    </div>
  );
}
