import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy py-80">
      <div className="container container-lg">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="content-wrapper">
              <div className="section mb-40">
                <h4 className="text-xl mb-16">Introduction</h4>
                <p className="text-gray-600">
                  At MerrBio, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website or make a purchase.
                </p>
              </div>

              <div className="section mb-40">
                <h4 className="text-xl mb-16">Information We Collect</h4>
                <ul className="list-unstyled">
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Personal information (name, email address, phone number)
                  </li>
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Shipping and billing addresses
                  </li>
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Payment information (processed securely through our payment providers)
                  </li>
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Device and browser information
                  </li>
                </ul>
              </div>

              <div className="section mb-40">
                <h4 className="text-xl mb-16">How We Use Your Information</h4>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 p-24 border border-gray-100 rounded-16">
                      <h6 className="mb-16">Order Processing</h6>
                      <p className="text-gray-600">We use your information to process and fulfill your orders, 
                      communicate about purchases, and provide customer support.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 p-24 border border-gray-100 rounded-16">
                      <h6 className="mb-16">Website Improvement</h6>
                      <p className="text-gray-600">We analyze user behavior to improve our website's 
                      functionality and enhance your shopping experience.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section mb-40">
                <h4 className="text-xl mb-16">Data Protection</h4>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to maintain the security 
                  of your personal information. Your data is protected through encryption and secure server 
                  protocols.
                </p>
              </div>

              <div className="section mb-40">
                <h4 className="text-xl mb-16">Your Rights</h4>
                <ul className="list-unstyled">
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Access your personal data
                  </li>
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Request correction of your personal data
                  </li>
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Request deletion of your personal data
                  </li>
                  <li className="mb-12 text-gray-600">
                    <i className="ph ph-check text-main-600 me-2"></i>
                    Opt-out of marketing communications
                  </li>
                </ul>
              </div>

              <div className="section">
                <h4 className="text-xl mb-16">Contact Us</h4>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  Email: privacy@merrbio.com
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
