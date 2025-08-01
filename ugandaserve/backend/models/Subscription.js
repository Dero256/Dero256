module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    plan: {
      type: DataTypes.ENUM('basic', 'pro', 'premium'),
      allowNull: false,
      defaultValue: 'basic'
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    currency: {
      type: DataTypes.ENUM('UGX', 'USD'),
      defaultValue: 'UGX'
    },
    billingCycle: {
      type: DataTypes.ENUM('monthly', 'quarterly', 'annually'),
      allowNull: false,
      defaultValue: 'monthly'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'cancelled', 'expired', 'pending'),
      allowNull: false,
      defaultValue: 'pending'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // Plan features
    maxServices: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    maxCategories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    maxImages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
    maxVideos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    featuredListing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    promotedListing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    prioritySupport: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    analyticsAccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    socialMediaIntegration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    videoPortfolio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Auto-renewal
    autoRenewal: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // Trial
    isTrial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    trialEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Payment tracking
    lastPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nextPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Cancellation
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Upgrade/downgrade tracking
    previousPlan: {
      type: DataTypes.ENUM('basic', 'pro', 'premium'),
      allowNull: true
    },
    upgradeDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Foreign key
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'subscriptions',
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['plan']
      },
      {
        fields: ['status']
      },
      {
        fields: ['endDate']
      },
      {
        fields: ['nextPaymentDate']
      }
    ],
    hooks: {
      beforeCreate: (subscription) => {
        // Set plan features based on plan type
        setplanFeatures(subscription);
        
        // Calculate end date based on billing cycle
        subscription.endDate = calculateEndDate(subscription.startDate, subscription.billingCycle);
        
        // Set next payment date
        if (subscription.plan !== 'basic') {
          subscription.nextPaymentDate = subscription.endDate;
        }
      },
      beforeUpdate: (subscription) => {
        // Update plan features if plan changed
        if (subscription.changed('plan')) {
          setplanFeatures(subscription);
        }
        
        // Recalculate end date if billing cycle changed
        if (subscription.changed('billingCycle') || subscription.changed('startDate')) {
          subscription.endDate = calculateEndDate(subscription.startDate, subscription.billingCycle);
        }
      }
    }
  });

  // Instance methods
  Subscription.prototype.isActive = function() {
    return this.status === 'active' && new Date() < new Date(this.endDate);
  };

  Subscription.prototype.isExpired = function() {
    return new Date() > new Date(this.endDate);
  };

  Subscription.prototype.daysUntilExpiry = function() {
    const now = new Date();
    const expiry = new Date(this.endDate);
    const diffTime = expiry - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  Subscription.prototype.canUpgrade = function() {
    const planHierarchy = { basic: 0, pro: 1, premium: 2 };
    return planHierarchy[this.plan] < 2; // Can upgrade if not already premium
  };

  Subscription.prototype.canDowngrade = function() {
    const planHierarchy = { basic: 0, pro: 1, premium: 2 };
    return planHierarchy[this.plan] > 0; // Can downgrade if not basic
  };

  // Helper function to set plan features
  function setplanFeatures(subscription) {
    const planFeatures = {
      basic: {
        planName: 'Basic',
        price: 0,
        maxServices: 1,
        maxCategories: 1,
        maxImages: 3,
        maxVideos: 0,
        featuredListing: false,
        promotedListing: false,
        prioritySupport: false,
        analyticsAccess: false,
        socialMediaIntegration: false,
        videoPortfolio: false
      },
      pro: {
        planName: 'Pro',
        price: 25000, // UGX
        maxServices: 5,
        maxCategories: 3,
        maxImages: 10,
        maxVideos: 2,
        featuredListing: true,
        promotedListing: false,
        prioritySupport: true,
        analyticsAccess: true,
        socialMediaIntegration: true,
        videoPortfolio: false
      },
      premium: {
        planName: 'Premium',
        price: 50000, // UGX
        maxServices: 999, // Unlimited
        maxCategories: 999, // Unlimited
        maxImages: 50,
        maxVideos: 10,
        featuredListing: true,
        promotedListing: true,
        prioritySupport: true,
        analyticsAccess: true,
        socialMediaIntegration: true,
        videoPortfolio: true
      }
    };

    const features = planFeatures[subscription.plan];
    Object.assign(subscription, features);
  }

  // Helper function to calculate end date
  function calculateEndDate(startDate, billingCycle) {
    const start = new Date(startDate);
    const end = new Date(start);

    switch (billingCycle) {
      case 'monthly':
        end.setMonth(end.getMonth() + 1);
        break;
      case 'quarterly':
        end.setMonth(end.getMonth() + 3);
        break;
      case 'annually':
        end.setFullYear(end.getFullYear() + 1);
        break;
    }

    return end;
  }

  return Subscription;
};