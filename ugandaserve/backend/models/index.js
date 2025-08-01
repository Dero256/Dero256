const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'ugandaserve_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Service = require('./Service')(sequelize, Sequelize.DataTypes);
const ServiceCategory = require('./ServiceCategory')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);
const Subscription = require('./Subscription')(sequelize, Sequelize.DataTypes);
const Payment = require('./Payment')(sequelize, Sequelize.DataTypes);
const Location = require('./Location')(sequelize, Sequelize.DataTypes);

// Define associations
const db = {
  sequelize,
  Sequelize,
  User,
  Service,
  ServiceCategory,
  Booking,
  Review,
  Subscription,
  Payment,
  Location
};

// User associations
User.hasMany(Service, { foreignKey: 'providerId', as: 'services' });
User.hasMany(Booking, { foreignKey: 'clientId', as: 'clientBookings' });
User.hasMany(Review, { foreignKey: 'clientId', as: 'reviewsGiven' });
User.hasOne(Subscription, { foreignKey: 'userId', as: 'subscription' });
User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });

// Service associations
Service.belongsTo(User, { foreignKey: 'providerId', as: 'provider' });
Service.belongsTo(ServiceCategory, { foreignKey: 'categoryId', as: 'category' });
Service.hasMany(Booking, { foreignKey: 'serviceId', as: 'bookings' });
Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Service.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });

// ServiceCategory associations
ServiceCategory.hasMany(Service, { foreignKey: 'categoryId', as: 'services' });

// Booking associations
Booking.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
Booking.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Booking.hasOne(Review, { foreignKey: 'bookingId', as: 'review' });
Booking.hasOne(Payment, { foreignKey: 'bookingId', as: 'payment' });

// Review associations
Review.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Review.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// Subscription associations
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Payment associations
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// Location associations
Location.hasMany(Service, { foreignKey: 'locationId', as: 'services' });

module.exports = db;