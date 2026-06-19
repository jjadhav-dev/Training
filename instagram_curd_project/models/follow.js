const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('follow', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    following_id: {
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
      defaultValue: "accepted"
    }
  }, {
    sequelize,
    tableName: 'follows',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "follows_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
