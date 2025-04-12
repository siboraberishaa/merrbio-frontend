import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import "../styles/auth.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-container">
      <ColorInit color={true} />
      <ScrollToTop smooth color="#6c757d" />

      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="brand-section">
            <img
              src="/assets/images/logo/logo-big.png"
              width={"80%"}
              alt="Logo"
            />
          </div>
        </div>

        <div className="auth-right">
          <div className="login-container">
            <div className="login-header">
              <h2>Create Account</h2>
              <p>Join our community today</p>
            </div>

            <form className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Username"
                />
              </div>

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

              <div className="form-group password-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`ph ${showConfirmPassword ? "ph-eye" : "ph-eye-slash"}`}
                  ></i>
                </button>
              </div>

              <div className="terms-section">
                <small>
                  By creating an account, you agree to our{" "}
                  <Link style={{color: "#299e60"}} to="#">Terms</Link> and{" "}
                  <Link style={{color: "#299e60"}} to="#">Privacy Policy</Link>
                </small>
              </div>

              <button type="submit" className="submit-btn">
                Create Account
              </button>

              <p className="signup-text">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
