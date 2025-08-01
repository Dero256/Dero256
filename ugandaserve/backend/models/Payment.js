module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    transactionRef: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.ENUM('mobile_money', 'card', 'bank_transfer', 'cash'),
      allowNull: false
    },
    provider: {
      type: DataTypes.ENUM('flutterwave', 'mtn_momo', 'airtel_money', 'manual'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('UGX', 'USD'),
      defaultValue: 'UGX'
    },
    status: {
      type: DataTypes.ENUM('pending', 'successful', 'failed', 'cancelled', 'refunded'),
      defaultValue: 'pending'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // External payment data
    externalTransactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gatewayResponse: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    // Foreign keys
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'bookings',
        key: 'id'
      }
    }
  }, {
    tableName: 'payments',
    timestamps: true
  });

  return Payment;
};