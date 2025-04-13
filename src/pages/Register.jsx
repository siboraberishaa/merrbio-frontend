import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/apiSlice";
import { setCredentials } from "../slices/authSlice";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
import "../styles/auth.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_farmer: false,
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.register.errors.passwordMatch"));
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_farmer: formData.is_farmer,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      setError(err?.data?.message || t("auth.register.errors.failed"));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
              <h2>{t("auth.register.title")}</h2>
              <p>{t("auth.register.subtitle")}</p>
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
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder={t("auth.register.username")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder={t("auth.register.email")}
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
                  placeholder={t("auth.register.password")}
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

              <div className="form-group password-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="auth-input"
                  placeholder={t("auth.register.confirmPassword")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`ph ${
                      showConfirmPassword ? "ph-eye" : "ph-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>

              <div className="form-group">
                <label
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="checkbox"
                    name="is_farmer"
                    checked={formData.is_farmer}
                    onChange={handleChange}
                  />
                  {t("auth.register.asFarmer")}
                </label>
              </div>

              <div className="terms-section">
                <small>
                  {t("auth.register.terms")}{" "}
                  <Link style={{ color: "#299e60" }} to="/privacy-policy">
                    {t("auth.register.termsLink")}
                  </Link>{" "}
                  {t("auth.register.and")}{" "}
                  <Link style={{ color: "#299e60" }} to="#">
                    {t("auth.register.privacyLink")}
                  </Link>
                </small>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading
                  ? t("auth.register.creatingAccount")
                  : t("auth.register.createAccount")}
              </button>

              <p className="signup-text">
                {t("auth.register.haveAccount")}{" "}
                <Link to="/login">{t("auth.register.signIn")}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
