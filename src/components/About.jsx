import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about-section py-80">
      <div className="container container-lg">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="about-content pe-lg-5">
              <h2 className="mb-32">Your Trusted Source for Quality Medical Laboratory Equipment</h2>
              <p className="text-gray-600 mb-32">
                MerrBio is dedicated to providing high-quality laboratory equipment and supplies 
                to medical facilities, research institutions, and healthcare professionals. With 
                over 15 years of experience, we've built a reputation for excellence in service 
                and product quality.
              </p>
              <div className="row g-4 mb-40">
                <div className="col-sm-6">
                  <div className="card h-100 p-24 border border-gray-100 rounded-16">
                    <div className="d-flex align-items-center mb-16">
                      <span className="icon-wrapper bg-main-50 text-main-600 rounded-circle p-2 me-3">
                        <i className="ph ph-check-circle text-xl"></i>
                      </span>
                      <h5 className="mb-0">Quality Assured</h5>
                    </div>
                    <p className="text-gray-600 mb-0">All products meet international quality standards</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card h-100 p-24 border border-gray-100 rounded-16">
                    <div className="d-flex align-items-center mb-16">
                      <span className="icon-wrapper bg-main-50 text-main-600 rounded-circle p-2 me-3">
                        <i className="ph ph-truck text-xl"></i>
                      </span>
                      <h5 className="mb-0">Fast Delivery</h5>
                    </div>
                    <p className="text-gray-600 mb-0">Quick and reliable worldwide shipping</p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="btn btn-main py-3 px-4">Contact Us</Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image position-relative">
              <img 
                src="/assets/images/about/about-main.jpg" 
                alt="About MerrBio" 
                className="img-fluid rounded-16"
              />
              <div className="stats-card position-absolute bg-white p-24 rounded-16 shadow-sm">
                <div className="row g-4">
                  <div className="col-6">
                    <h3 className="text-main-600 mb-2">15+</h3>
                    <p className="mb-0">Years Experience</p>
                  </div>
                  <div className="col-6">
                    <h3 className="text-main-600 mb-2">5K+</h3>
                    <p className="mb-0">Happy Clients</p>
                  </div>
                  <div className="col-6">
                    <h3 className="text-main-600 mb-2">1K+</h3>
                    <p className="mb-0">Products</p>
                  </div>
                  <div className="col-6">
                    <h3 className="text-main-600 mb-2">24/7</h3>
                    <p className="mb-0">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-80">
          <div className="col-12">
            <h3 className="text-center mb-40">Our Values</h3>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 p-24 border border-gray-100 rounded-16 text-center">
                  <i className="ph ph-heart text-main-600 text-4xl mb-16"></i>
                  <h5 className="mb-16">Quality First</h5>
                  <p className="text-gray-600 mb-0">
                    We never compromise on quality, ensuring all our products meet the highest standards
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 p-24 border border-gray-100 rounded-16 text-center">
                  <i className="ph ph-users-three text-main-600 text-4xl mb-16"></i>
                  <h5 className="mb-16">Customer Focus</h5>
                  <p className="text-gray-600 mb-0">
                    Our customers' success is our success. We provide outstanding support and service
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 p-24 border border-gray-100 rounded-16 text-center">
                  <i className="ph ph-tree text-main-600 text-4xl mb-16"></i>
                  <h5 className="mb-16">Sustainability</h5>
                  <p className="text-gray-600 mb-0">
                    We're committed to environmental responsibility in our operations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
