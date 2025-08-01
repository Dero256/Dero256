import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to services page with search params
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (location) params.append('location', location);
    window.location.href = `/services?${params.toString()}`;
  };

  const featuredCategories = [
    {
      id: 1,
      name: 'Photography',
      icon: '📸',
      color: 'bg-blue-500',
      description: 'Professional photography for events, portraits, and weddings',
      serviceCount: 45
    },
    {
      id: 2,
      name: 'Makeup & Beauty',
      icon: '💄',
      color: 'bg-pink-500',
      description: 'Makeup artists, hairstylists, and beauty professionals',
      serviceCount: 32
    },
    {
      id: 3,
      name: 'Driving Lessons',
      icon: '🚗',
      color: 'bg-green-500',
      description: 'Learn to drive with certified instructors',
      serviceCount: 28
    },
    {
      id: 4,
      name: 'Home Services',
      icon: '🔧',
      color: 'bg-orange-500',
      description: 'Plumbing, carpentry, electrical, and maintenance',
      serviceCount: 67
    },
    {
      id: 5,
      name: 'Catering',
      icon: '🍽️',
      color: 'bg-red-500',
      description: 'Professional catering for events and functions',
      serviceCount: 23
    },
    {
      id: 6,
      name: 'Cleaning',
      icon: '🧹',
      color: 'bg-purple-500',
      description: 'House cleaning, office cleaning, and deep cleaning',
      serviceCount: 19
    }
  ];

  const featuredProviders = [
    {
      id: 1,
      name: 'Sarah Nakamya',
      business: 'Pearl Photography',
      image: '/api/placeholder/100/100',
      rating: 4.9,
      reviews: 127,
      location: 'Kampala',
      specialty: 'Wedding Photography',
      verified: true
    },
    {
      id: 2,
      name: 'James Mukasa',
      business: 'Fix-It Solutions',
      image: '/api/placeholder/100/100',
      rating: 4.8,
      reviews: 89,
      location: 'Entebbe',
      specialty: 'Home Repairs',
      verified: true
    },
    {
      id: 3,
      name: 'Grace Atukunda',
      business: 'Glamour Makeup',
      image: '/api/placeholder/100/100',
      rating: 4.9,
      reviews: 156,
      location: 'Jinja',
      specialty: 'Bridal Makeup',
      verified: true
    }
  ];

  const stats = [
    { label: 'Service Providers', value: '1,200+', icon: UserGroupIcon },
    { label: 'Services Booked', value: '5,400+', icon: CheckCircleIcon },
    { label: 'Cities Covered', value: '15+', icon: BuildingStorefrontIcon },
    { label: 'Average Response', value: '< 2hrs', icon: ClockIcon }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-pattern"></div>
        <div className="relative container-custom section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow-lg">
              Uganda's Premier
              <span className="block text-accent-400">Service Marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-shadow">
              Connect with trusted local service providers across Uganda. 
              From photography to home repairs, find the perfect professional for your needs.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-2xl">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need? (e.g., photographer, plumber)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPinIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 appearance-none"
                  >
                    <option value="">Select Location</option>
                    <option value="kampala">Kampala</option>
                    <option value="entebbe">Entebbe</option>
                    <option value="jinja">Jinja</option>
                    <option value="mbarara">Mbarara</option>
                    <option value="gulu">Gulu</option>
                    <option value="lira">Lira</option>
                    <option value="mbale">Mbale</option>
                    <option value="fort-portal">Fort Portal</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn-secondary px-8 py-3 text-lg font-semibold whitespace-nowrap"
                >
                  Find Services
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-accent-400" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm md:text-base text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most requested services in Uganda. From professional photography 
              to home maintenance, find exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/services?category=${category.name.toLowerCase()}`}
                className="card-hover group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${category.color} p-3 rounded-xl text-white text-2xl`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 mb-2">
                      {category.description}
                    </p>
                    <div className="text-primary-600 text-sm font-medium">
                      {category.serviceCount} providers available
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="btn-outline px-8 py-3 text-lg"
            >
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top-Rated Service Providers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet some of our verified professionals who have earned exceptional 
              ratings from satisfied clients across Uganda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Link
                key={provider.id}
                to={`/providers/${provider.id}`}
                className="card-hover group cursor-pointer"
              >
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary-200"
                    />
                    {provider.verified && (
                      <CheckCircleIcon className="h-6 w-6 text-primary-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-primary-600 font-medium">{provider.business}</p>
                  <p className="text-gray-600 text-sm mb-3">{provider.specialty}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{provider.rating}</span>
                    <span className="text-sm text-gray-500">({provider.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/providers"
              className="btn-outline px-8 py-3 text-lg"
            >
              View All Providers
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How UgandaServe Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting the services you need is simple with our platform. 
              Connect, book, and pay securely in just a few steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Search & Browse</h3>
              <p className="text-gray-600">
                Search for services in your area or browse by category. 
                Filter by location, price, and ratings to find the perfect match.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Connect & Book</h3>
              <p className="text-gray-600">
                View provider profiles, read reviews, and book services directly. 
                Schedule appointments that work for your timeline.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Pay & Review</h3>
              <p className="text-gray-600">
                Pay securely via Mobile Money or card after service completion. 
                Leave reviews to help other clients make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust UgandaServe 
            for their service needs across Uganda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Find Services Now
            </Link>
            <Link
              to="/register?role=provider"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;