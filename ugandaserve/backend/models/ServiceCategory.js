module.exports = (sequelize, DataTypes) => {
  const ServiceCategory = sequelize.define('ServiceCategory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Icon name or URL for the category'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Category image URL'
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '#4F46E5',
      validate: {
        is: /^#[0-9A-F]{6}$/i
      }
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    serviceCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.STRING(160),
      allowNull: true
    },
    // Parent category for subcategories
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'service_categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'service_categories',
    timestamps: true,
    indexes: [
      {
        fields: ['slug']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['isFeatured']
      },
      {
        fields: ['parentId']
      },
      {
        fields: ['sortOrder']
      }
    ],
    hooks: {
      beforeCreate: (category) => {
        if (!category.slug) {
          category.slug = generateSlug(category.name);
        }
      },
      beforeUpdate: (category) => {
        if (category.changed('name') && !category.changed('slug')) {
          category.slug = generateSlug(category.name);
        }
      }
    }
  });

  // Self-referential association for parent-child categories
  ServiceCategory.hasMany(ServiceCategory, { 
    foreignKey: 'parentId', 
    as: 'subcategories' 
  });
  ServiceCategory.belongsTo(ServiceCategory, { 
    foreignKey: 'parentId', 
    as: 'parent' 
  });

  // Instance methods
  ServiceCategory.prototype.isSubcategory = function() {
    return this.parentId !== null;
  };

  ServiceCategory.prototype.isParentCategory = function() {
    return this.parentId === null;
  };

  // Helper function to generate slug
  function generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  return ServiceCategory;
};