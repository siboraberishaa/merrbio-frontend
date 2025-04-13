import React, { useState, useEffect } from "react";
import { useContactWithMutation } from "../slices/apiSlice";

const ContactModal = ({ isOpen, onClose, productUser }) => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [formData, setFormData] = useState({
    toMail: "",
    subject: "",
    message: "",
    from: userInfo?.user?.email || "",
  });

  // Add useEffect to update formData when productUser changes
  useEffect(() => {
    if (productUser) {
      setFormData((prev) => ({
        ...prev,
        toMail: productUser,
      }));
    }
  }, [productUser]);

  // Add debug logs
  useEffect(() => {
    console.log("Product User:", productUser);
    console.log("Current Form Data:", formData);
  }, [productUser, formData]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [contactWith, { isLoading }] = useContactWithMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting with data:", formData); // Add this to debug
      await contactWith(formData).unwrap();
      setSuccess("Email sent successfully!");
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 2000);
    } catch (err) {
      console.log("Error response:", err); // Add this to debug
      setError(err?.data?.message || "Failed to send email");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-content" style={modalStyle}>
        <div className="modal-header">
          <h4>Contact Product Owner</h4>
          <button onClick={onClose} style={closeButtonStyle}>
            &times;
          </button>
        </div>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="success-message"
            style={{ color: "green", marginBottom: "1rem" }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Your Email</label>
            <input
              type="email"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="btn btn-main" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
};

const closeButtonStyle = {
  position: "absolute",
  right: "1rem",
  top: "1rem",
  border: "none",
  background: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

export default ContactModal;
