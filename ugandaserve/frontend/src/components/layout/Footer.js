import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Find Services', href: '/services' },
    { name: 'Browse Providers', href: '/providers' },
    { name: 'Subscription Plans', href: '/subscription-plans' },
    { name: 'How It Works', href: '/about' },
  ];

  const support = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Safety Guidelines', href: '/safety' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const providers = [
    { name: 'Become a Provider', href: '/register?role=provider' },
    { name: 'Provider Dashboard', href: '/dashboard' },
    { name: 'Pricing Plans', href: '/subscription-plans' },
    { name: 'Success Stories', href: '/success-stories' },
  ];

  const popularCities = [
    'Kampala', 'Entebbe', 'Jinja', 'Mbarara', 
    'Gulu', 'Lira', 'Mbale', 'Fort Portal'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl text-white">Uganda</span>
              <span className="font-bold text-xl text-primary-400">Serve</span>
            </Link>
            
            <p className="text-gray-300 mb-4 text-sm">
              Uganda's premier service marketplace connecting clients with trusted local service providers nationwide.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-2 text-primary-400" />
                <span>+256 700 123 456</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-primary-400" />
                <span>hello@ugandaserve.com</span>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="h-4 w-4 mr-2 text-primary-400 mt-0.5" />
                <span>Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Providers</h3>
            <ul className="space-y-2">
              {providers.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Cities */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-medium text-base mb-2">Cities We Serve</h4>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city) => (
                <Link
                  key={city}
                  to={`/services?location=${city.toLowerCase()}`}
                  className="text-xs bg-gray-800 text-gray-300 hover:text-primary-400 px-2 py-1 rounded transition-colors duration-200"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-sm text-gray-400 mb-4 md:mb-0">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>in Uganda</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-primary-400 transition-colors duration-200">
                Cookie Policy
              </Link>
              <span>© {currentYear} UgandaServe. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;