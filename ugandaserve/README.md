# 🇺🇬 UgandaServe - Service Marketplace Platform

**Uganda's Premier Service Marketplace** connecting clients with trusted local service providers across the nation.

![UgandaServe Logo](./docs/images/logo.png)

## 🌟 Overview

UgandaServe is a comprehensive marketplace platform designed specifically for Uganda, enabling clients to discover, book, and pay for local services while empowering service providers to grow their businesses through tiered subscription plans.

### Key Features

- **🔍 Service Discovery**: Advanced search and filtering by location, category, price, and ratings
- **📱 Mobile-First Design**: Optimized for Uganda's mobile-heavy internet usage
- **💰 Mobile Money Integration**: Flutterwave-powered payments supporting MTN & Airtel Money
- **⭐ Trust System**: Verified providers, reviews, and ratings
- **📊 Subscription Tiers**: Basic (Free), Pro (25K UGX), Premium (50K UGX) plans
- **🗺️ Nationwide Coverage**: Serving 15+ cities across Uganda

### Service Categories

- Photography & Videography
- Makeup & Beauty Services
- Driving Lessons
- Home Services (Plumbing, Carpentry, Electrical)
- Catering & Events
- Cleaning Services
- And many more...

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Heroicons** - Beautiful icons
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Cloudinary** - Image/video storage
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### Integrations
- **Flutterwave** - Payment processing (Mobile Money + Cards)
- **Africa's Talking** - SMS notifications
- **Nodemailer** - Email services
- **Leaflet** - Map integration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ugandaserve.git
   cd ugandaserve
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Or install separately
   npm run backend:install
   npm run frontend:install
   ```

3. **Setup environment variables**
   ```bash
   # Backend environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Update these key variables:
   # - Database connection details
   # - JWT secret
   # - Flutterwave API keys
   # - Africa's Talking credentials
   # - Cloudinary settings
   ```

4. **Setup database**
   ```bash
   # Create PostgreSQL database
   createdb ugandaserve_db
   
   # Run migrations (when implemented)
   cd backend && npm run migrate
   ```

5. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start separately
   npm run backend:dev    # Backend on :5000
   npm run frontend:dev   # Frontend on :3000
   ```

## 📱 Mobile-First Features

### Ugandan Context Optimizations
- **Data-Light Mode**: Optimized images and minimal data usage
- **SMS Integration**: Booking confirmations and reminders
- **Local Payment Methods**: MTN Money, Airtel Money support
- **Ugandan Phone Format**: +256 validation
- **Regional Coverage**: All major Ugandan cities

### Responsive Design
- Mobile-first approach (90%+ mobile usage in Uganda)
- Touch-friendly interfaces
- Fast loading times
- Offline-friendly design patterns

## 💼 Subscription Plans

| Feature | Basic (Free) | Pro (25K UGX/mo) | Premium (50K UGX/mo) |
|---------|-------------|------------------|---------------------|
| Service Categories | 1 | 3 | Unlimited |
| Portfolio Images | 3 | 10 | 50 |
| Video Portfolio | ❌ | ❌ | ✅ |
| Featured Badge | ❌ | ✅ | ✅ |
| Promoted Listings | ❌ | ❌ | ✅ |
| Analytics Access | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |

## 🏛️ Architecture

### Database Schema
```
Users (clients, providers, admins)
├── Services (provider offerings)
├── ServiceCategories (organized taxonomy)
├── Bookings (client-provider transactions)
├── Reviews (trust system)
├── Subscriptions (provider plans)
├── Payments (transaction records)
└── Locations (Uganda districts/cities)
```

### API Structure
```
/api
├── /auth          # Authentication endpoints
├── /users         # User management
├── /services      # Service CRUD
├── /bookings      # Booking management
├── /subscriptions # Plan management
├── /payments      # Payment processing
├── /reviews       # Review system
└── /admin         # Admin operations
```

## 🔐 Security Features

- **JWT Authentication** with secure token storage
- **Rate Limiting** to prevent abuse
- **Input Validation** with express-validator
- **Helmet.js** for security headers
- **CORS Protection** configured for production
- **SQL Injection Prevention** via Sequelize ORM
- **Password Encryption** using bcryptjs

## 🌍 Deployment

### Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
DB_HOST=your-production-db-host
DB_NAME=ugandaserve_production
FLUTTERWAVE_SECRET_KEY=your-live-key
FRONTEND_URL=https://ugandaserve.com
```

### Deployment Options
- **Heroku**: Easy deployment with Postgres add-on
- **DigitalOcean**: App Platform or Droplets
- **AWS**: EC2 + RDS for scalability
- **Vercel/Netlify**: Frontend hosting options

## 📊 Monitoring & Analytics

### Business Metrics
- Service provider growth
- Booking conversion rates
- Revenue per subscription tier
- Geographic usage patterns
- Mobile vs desktop usage

### Technical Monitoring
- API response times
- Database performance
- Error rates and logging
- Payment success rates

## 🤝 Contributing

### Development Guidelines
1. Follow the established code style
2. Write tests for new features
3. Update documentation
4. Follow Git best practices

### Project Structure
```
ugandaserve/
├── backend/           # Express.js API
│   ├── models/        # Database models
│   ├── routes/        # API endpoints
│   ├── middleware/    # Custom middleware
│   └── utils/         # Helper functions
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Route components
│   │   ├── contexts/    # React contexts
│   │   └── utils/       # Helper functions
└── docs/              # Documentation
```

## 📞 Support

- **Email**: hello@ugandaserve.com
- **Phone**: +256 700 123 456
- **Documentation**: [docs.ugandaserve.com](https://docs.ugandaserve.com)
- **Support Hours**: 8 AM - 8 PM EAT, Monday - Saturday

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for Uganda
- Inspired by successful marketplaces like Fiverr and Thumbtack
- Special thanks to the Ugandan entrepreneurship community
- Uganda flag colors integrated throughout the design

---

**Made with 🇺🇬 in Uganda** | © 2024 UgandaServe. All rights reserved.