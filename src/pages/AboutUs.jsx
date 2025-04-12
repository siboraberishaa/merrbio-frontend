import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Welcome to MerrBio
          </h2>
          <p className="text-gray-600 mb-6">
            Founded in 2023, MerrBio is committed to delivering innovative
            solutions in the biotechnology sector. Our team of dedicated
            professionals works tirelessly to advance scientific research and
            development.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 mb-6">
            To revolutionize biotechnology through innovative research,
            sustainable practices, and cutting-edge solutions that benefit
            humanity and our environment.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Our Values
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Innovation: Pushing boundaries in biotechnology research</li>
            <li>Integrity: Maintaining highest ethical standards</li>
            <li>Collaboration: Working together for breakthrough solutions</li>
            <li>Excellence: Delivering quality in everything we do</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">Our Team</h3>
          <p className="text-gray-600">
            Our diverse team brings together experts from various fields
            including molecular biology, genetics, bioengineering, and data
            science. Together, we work to create sustainable solutions for
            tomorrow's challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
