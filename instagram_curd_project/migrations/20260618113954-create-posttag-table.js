'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posttags', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tags',
          key: 'id'
        }
      },
      is_deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posttags')
  }
};
