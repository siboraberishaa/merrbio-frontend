import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/apiSlice";
import { setCredentials } from "../slices/authSlice";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import { useTranslation } from "react-i18next";
import "../styles/auth.css";

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      setError(err?.data?.message || t("auth.login.errors.failed"));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              <h2>{t("auth.login.welcome")}</h2>
              <p>{t("auth.login.enterCredentials")}</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="error-message"
                  style={{ color: "red", marginBottom: "1rem" }}
                >
                  {error}
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder={t("auth.login.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="auth-input"
                  placeholder={t("auth.login.password")}
                  value={formData.password}
                  onChange={handleChange}
                  required
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

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? t("auth.login.signingIn") : t("auth.login.signIn")}
              </button>

              <p className="signup-text">
                {t("auth.login.noAccount")}{" "}
                <Link to="/register">{t("auth.login.signUp")}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
