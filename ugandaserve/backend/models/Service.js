module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [20, 2000]
      }
    },
    shortDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    currency: {
      type: DataTypes.ENUM('UGX', 'USD'),
      defaultValue: 'UGX'
    },
    pricingType: {
      type: DataTypes.ENUM('fixed', 'hourly', 'daily', 'custom'),
      defaultValue: 'fixed'
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      allowNull: true,
      comment: 'Service duration in minutes'
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    videos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPromoted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Availability
    availableDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      comment: 'Days of the week service is available'
    },
    availableTimeSlots: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Time slots for each day'
    },
    // Location
    serviceLocation: {
      type: DataTypes.ENUM('client_location', 'provider_location', 'both', 'online'),
      defaultValue: 'client_location'
    },
    serviceRadius: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      comment: 'Service radius in kilometers'
    },
    // Requirements
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Special requirements or notes'
    },
    includesEquipment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Booking settings
    instantBooking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    advanceBookingDays: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 0,
        max: 365
      }
    },
    cancellationPolicy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Statistics
    totalBookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    completedBookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.00,
      validate: {
        min: 0.00,
        max: 5.00
      }
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Foreign keys
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'service_categories',
        key: 'id'
      }
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    // SEO
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.STRING(160),
      allowNull: true
    }
  }, {
    tableName: 'services',
    timestamps: true,
    indexes: [
      {
        fields: ['providerId']
      },
      {
        fields: ['categoryId']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['isFeatured']
      },
      {
        fields: ['isPromoted']
      },
      {
        fields: ['basePrice']
      },
      {
        fields: ['averageRating']
      },
      {
        fields: ['serviceLocation']
      },
      {
        fields: ['slug']
      },
      {
        fields: ['tags'], using: 'gin'
      }
    ],
    hooks: {
      beforeCreate: (service) => {
        // Generate slug from title
        if (!service.slug) {
          service.slug = generateSlug(service.title);
        }
        // Generate short description if not provided
        if (!service.shortDescription && service.description) {
          service.shortDescription = service.description.substring(0, 150) + '...';
        }
      },
      beforeUpdate: (service) => {
        // Update short description if description changed
        if (service.changed('description') && !service.changed('shortDescription')) {
          service.shortDescription = service.description.substring(0, 150) + '...';
        }
      }
    }
  });

  // Instance methods
  Service.prototype.calculateCompletionRate = function() {
    if (this.totalBookings === 0) return 0;
    return Math.round((this.completedBookings / this.totalBookings) * 100);
  };

  Service.prototype.isAvailableOn = function(dayOfWeek) {
    return this.availableDays.includes(dayOfWeek.toLowerCase());
  };

  Service.prototype.getFormattedPrice = function() {
    const formatter = new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: this.currency === 'UGX' ? 'UGX' : 'USD'
    });
    return formatter.format(this.basePrice);
  };

  // Helper function to generate slug
  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  return Service;
};