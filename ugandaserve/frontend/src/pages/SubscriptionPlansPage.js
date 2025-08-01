import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const SubscriptionPlansPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      currency: '',
      period: '',
      description: 'Perfect for getting started',
      features: [
        '1 service category',
        'Limited profile (no portfolio)',
        'Basic search visibility',
        'Standard support'
      ],
      limitations: [
        'No featured badge',
        'No analytics',
        'Limited visibility'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      price: '25,000',
      currency: 'UGX',
      period: '/month',
      description: 'Great for growing businesses',
      features: [
        '3 service categories',
        'Portfolio uploads (10 images)',
        '"Featured" badge',
        'Medium search priority',
        'Client analytics',
        'Priority support'
      ],
      limitations: [],
      cta: 'Choose Pro',
      popular: true,
      color: 'primary'
    },
    {
      name: 'Premium',
      price: '50,000',
      currency: 'UGX',
      period: '/month',
      description: 'For established professionals',
      features: [
        'Unlimited categories',
        'Video portfolio + social links',
        'Top search placement',
        'Dedicated support',
        'Promoted listings',
        'Advanced analytics',
        'Priority customer support',
        'Custom branding options'
      ],
      limitations: [],
      cta: 'Choose Premium',
      popular: false,
      color: 'secondary'
    }
  ];

  const getColorClasses = (color, popular = false) => {
    const colors = {
      gray: {
        border: 'border-gray-200',
        text: 'text-gray-900',
        button: 'bg-gray-900 hover:bg-gray-800 text-white',
        badge: 'bg-gray-100 text-gray-800'
      },
      primary: {
        border: popular ? 'border-primary-500 ring-2 ring-primary-500' : 'border-primary-200',
        text: 'text-primary-900',
        button: 'bg-primary-600 hover:bg-primary-700 text-white',
        badge: 'bg-primary-100 text-primary-800'
      },
      secondary: {
        border: 'border-secondary-200',
        text: 'text-secondary-900',
        button: 'bg-secondary-600 hover:bg-secondary-700 text-white',
        badge: 'bg-secondary-100 text-secondary-800'
      }
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select the perfect subscription plan for your service business. 
            All plans include access to our platform and customer base.
          </p>
          
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mb-8">
            <span>🇺🇬</span>
            <span>Proudly serving Uganda</span>
            <span>•</span>
            <span>Mobile Money supported</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const colors = getColorClasses(plan.color, plan.popular);
              
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg ${colors.border} border-2 p-8 ${
                    plan.popular ? 'transform scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`${colors.badge} px-4 py-2 rounded-full text-sm font-medium`}>
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.currency} {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-600 text-lg">{plan.period}</span>
                      )}
                    </div>

                    <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${colors.button}`}>
                      {plan.cta}
                    </button>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="mt-6">
                        <h5 className="font-medium text-gray-700 mb-2">Limitations:</h5>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start">
                              <span className="text-red-400 mr-3">×</span>
                              <span className="text-gray-600 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Annual Discount Notice */}
          <div className="mt-12 text-center">
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-accent-800 mb-2">
                💰 Save with Annual Billing
              </h3>
              <p className="text-accent-700">
                Get 2 months free when you pay annually! 
                That's a 16% discount on Pro and Premium plans.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. 
                  Changes take effect immediately, and billing is prorated.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept Mobile Money (MTN, Airtel), Visa/Mastercard, and bank transfers. 
                  All payments are processed securely through Flutterwave.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is there a setup fee?
                </h3>
                <p className="text-gray-600">
                  No setup fees! You only pay the monthly or annual subscription fee. 
                  The Basic plan is completely free forever.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do you take a commission on bookings?
                </h3>
                <p className="text-gray-600">
                  For most services, we don't take any commission. 
                  A small 5% fee applies only to high-value event bookings over UGX 500,000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join over 1,200 service providers who trust UgandaServe to connect them with clients.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlansPage;