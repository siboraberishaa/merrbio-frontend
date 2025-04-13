import React from "react";
import { Link } from "react-router-dom";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";

const NotFound = () => {
  return (
    <>
      <HeaderOne />
      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <img
                src="/assets/images/404.png"
                alt="404"
                className="img-fluid mb-4 w-50"
              />
              <h1 className="mb-4 text-heading">Page Not Found</h1>
              <p className="mb-4 text-gray-500">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
              <Link to="/" className="btn btn-main">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FooterOne />
    </>
  );
};

export default NotFound;
