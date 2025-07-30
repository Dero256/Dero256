import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About UgandaServe
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Connecting Uganda with trusted local service providers, 
              one booking at a time.
            </p>
            
            <div className="prose prose-lg mx-auto text-left text-gray-700">
              <p>
                UgandaServe was born from a simple observation: finding reliable service providers 
                in Uganda shouldn't be a challenge. Whether you need a photographer for your wedding, 
                a plumber for your home, or driving lessons for your teenager, we believe everyone 
                deserves access to quality services.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p>
                To empower local service providers across Uganda while making it effortless 
                for clients to find and book the services they need. We're building a 
                platform that celebrates Ugandan entrepreneurship and connects communities.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose UgandaServe?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verified service providers with real reviews</li>
                <li>Mobile Money integration for easy payments</li>
                <li>Nationwide coverage across Uganda</li>
                <li>24/7 customer support</li>
                <li>Fair pricing with no hidden fees</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;