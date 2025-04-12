import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import "../styles/auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <ColorInit color={true} />
      <ScrollToTop smooth color="#6c757d" />

      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="brand-section">
            <img src="/assets/images/logo/logo-big.png" width={'80%'} alt="Logo" />
          </div>
        </div>

        <div className="auth-right">
          <div className="login-container">
            <div className="login-header">
              <h2>Welcome back</h2>
              <p>Enter your credentials to continue</p>
            </div>

            <form className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email address"
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`ph ${showPassword ? "ph-eye" : "ph-eye-slash"}`}
                  ></i>
                </button>
              </div>

              <div className="form-footer">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="#" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-btn">
                Sign in
              </button>

              <p className="signup-text">
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
