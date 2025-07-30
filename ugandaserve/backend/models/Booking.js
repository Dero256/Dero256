module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookingReference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'pending', 'confirmed', 'in_progress', 'completed', 
        'cancelled', 'rejected', 'rescheduled'
      ),
      allowNull: false,
      defaultValue: 'pending'
    },
    // Scheduling
    scheduledDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    scheduledTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Duration in minutes'
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    // Location details
    serviceLocation: {
      type: DataTypes.ENUM('client_location', 'provider_location', 'online'),
      allowNull: false
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
    // Pricing
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    additionalCharges: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('UGX', 'USD'),
      defaultValue: 'UGX'
    },
    // Client details and requirements
    clientNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Special instructions from client'
    },
    providerNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Notes from service provider'
    },
    // Communication
    clientPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Confirmation and tracking
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cancelledBy: {
      type: DataTypes.ENUM('client', 'provider', 'admin'),
      allowNull: true
    },
    // Rescheduling
    originalDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    originalTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    rescheduledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rescheduledBy: {
      type: DataTypes.ENUM('client', 'provider'),
      allowNull: true
    },
    rescheduleCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Payment status
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'partially_paid', 'refunded', 'failed'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    advancePayment: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    // Notifications
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reminderSentAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Reviews
    canReview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reviewSubmitted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Foreign keys
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id'
      }
    }
  }, {
    tableName: 'bookings',
    timestamps: true,
    indexes: [
      {
        fields: ['clientId']
      },
      {
        fields: ['serviceId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['scheduledDate']
      },
      {
        fields: ['paymentStatus']
      },
      {
        fields: ['bookingReference']
      },
      {
        fields: ['scheduledDate', 'scheduledTime']
      }
    ],
    hooks: {
      beforeCreate: (booking) => {
        // Generate booking reference
        booking.bookingReference = generateBookingReference();
        
        // Calculate total amount
        booking.totalAmount = parseFloat(booking.basePrice) + 
                              parseFloat(booking.additionalCharges || 0) - 
                              parseFloat(booking.discount || 0);
        
        // Calculate end time
        if (booking.scheduledTime && booking.duration) {
          booking.endTime = calculateEndTime(booking.scheduledTime, booking.duration);
        }
      },
      beforeUpdate: (booking) => {
        // Recalculate total if pricing fields changed
        if (booking.changed('basePrice') || booking.changed('additionalCharges') || booking.changed('discount')) {
          booking.totalAmount = parseFloat(booking.basePrice) + 
                                parseFloat(booking.additionalCharges || 0) - 
                                parseFloat(booking.discount || 0);
        }
        
        // Update status timestamps
        if (booking.changed('status')) {
          const now = new Date();
          switch (booking.status) {
            case 'confirmed':
              booking.confirmedAt = now;
              break;
            case 'in_progress':
              booking.startedAt = now;
              break;
            case 'completed':
              booking.completedAt = now;
              booking.canReview = true;
              break;
            case 'cancelled':
              booking.cancelledAt = now;
              break;
          }
        }
        
        // Track rescheduling
        if (booking.changed('scheduledDate') || booking.changed('scheduledTime')) {
          if (booking.originalDate === null) {
            booking.originalDate = booking._previousDataValues.scheduledDate;
            booking.originalTime = booking._previousDataValues.scheduledTime;
          }
          booking.rescheduledAt = new Date();
          booking.rescheduleCount += 1;
        }
      }
    }
  });

  // Instance methods
  Booking.prototype.isUpcoming = function() {
    const now = new Date();
    const bookingDateTime = new Date(`${this.scheduledDate}T${this.scheduledTime}`);
    return bookingDateTime > now && ['confirmed', 'pending'].includes(this.status);
  };

  Booking.prototype.isPast = function() {
    const now = new Date();
    const bookingDateTime = new Date(`${this.scheduledDate}T${this.scheduledTime}`);
    return bookingDateTime < now;
  };

  Booking.prototype.canCancel = function() {
    const now = new Date();
    const bookingDateTime = new Date(`${this.scheduledDate}T${this.scheduledTime}`);
    const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);
    
    return ['pending', 'confirmed'].includes(this.status) && hoursUntilBooking > 24;
  };

  Booking.prototype.canReschedule = function() {
    const now = new Date();
    const bookingDateTime = new Date(`${this.scheduledDate}T${this.scheduledTime}`);
    const hoursUntilBooking = (bookingDateTime - now) / (1000 * 60 * 60);
    
    return ['pending', 'confirmed'].includes(this.status) && 
           hoursUntilBooking > 24 && 
           this.rescheduleCount < 3;
  };

  Booking.prototype.getFormattedAmount = function() {
    const formatter = new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: this.currency === 'UGX' ? 'UGX' : 'USD'
    });
    return formatter.format(this.totalAmount);
  };

  // Helper function to generate booking reference
  function generateBookingReference() {
    const prefix = 'UGS';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  // Helper function to calculate end time
  function calculateEndTime(startTime, durationMinutes) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    return endDate.toTimeString().slice(0, 8);
  }

  return Booking;
};