const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "published"
    },
    schedule_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    caption: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post_type: {
      type: DataTypes.ENUM("image","video"),
      allowNull: true,
      defaultValue: "image"
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'posts',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "posts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
