module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    helpfulCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'bookings',
        key: 'id'
      }
    }
  }, {
    tableName: 'reviews',
    timestamps: true,
    indexes: [
      {
        fields: ['clientId']
      },
      {
        fields: ['serviceId']
      },
      {
        fields: ['rating']
      }
    ]
  });

  return Review;
};