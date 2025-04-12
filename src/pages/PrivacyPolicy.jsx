import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 mb-6">
            At MerrBio, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Information We Collect
          </h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Personal Information
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>Company information (if applicable)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Data Security
          </h2>
          <p className="text-gray-600 mb-6">
            We implement appropriate security measures to protect against
            unauthorized access, alteration, disclosure, or destruction of your
            information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, please contact us
            at privacy@merrbio.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
