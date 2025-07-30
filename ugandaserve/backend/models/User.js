module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /^(\+256|0)[0-9]{9}$/ // Uganda phone number format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    role: {
      type: DataTypes.ENUM('client', 'provider', 'admin'),
      allowNull: false,
      defaultValue: 'client'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Provider-specific fields
    businessName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    businessLicense: {
      type: DataTypes.STRING,
      allowNull: true
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 50
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    // Social media links
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Provider verification
    isProviderVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    // Ratings
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
    // Subscription info
    subscriptionTier: {
      type: DataTypes.ENUM('basic', 'pro', 'premium'),
      defaultValue: 'basic'
    },
    subscriptionExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Notification preferences
    emailNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    smsNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    pushNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // Login tracking
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    loginCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Account completion
    profileCompletion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        fields: ['email']
      },
      {
        fields: ['phone']
      },
      {
        fields: ['role']
      },
      {
        fields: ['district']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['isProviderVerified']
      },
      {
        fields: ['subscriptionTier']
      },
      {
        fields: ['averageRating']
      }
    ],
    hooks: {
      beforeCreate: (user) => {
        // Calculate initial profile completion
        user.profileCompletion = calculateProfileCompletion(user);
      },
      beforeUpdate: (user) => {
        // Recalculate profile completion on update
        user.profileCompletion = calculateProfileCompletion(user);
      }
    }
  });

  // Instance methods
  User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };

  User.prototype.isProvider = function() {
    return this.role === 'provider';
  };

  User.prototype.isClient = function() {
    return this.role === 'client';
  };

  User.prototype.isAdmin = function() {
    return this.role === 'admin';
  };

  User.prototype.hasActiveSubscription = function() {
    return this.subscriptionExpiry && new Date() < new Date(this.subscriptionExpiry);
  };

  // Helper function to calculate profile completion
  function calculateProfileCompletion(user) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const optionalFields = ['profileImage', 'bio'];
    const providerFields = user.role === 'provider' ? 
      ['businessName', 'businessDescription', 'location', 'district'] : [];
    
    const allFields = [...requiredFields, ...optionalFields, ...providerFields];
    const completedFields = allFields.filter(field => user[field] && user[field].toString().trim() !== '');
    
    return Math.round((completedFields.length / allFields.length) * 100);
  }

  return User;
};