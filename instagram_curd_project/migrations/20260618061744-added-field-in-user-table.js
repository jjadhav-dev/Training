'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING(255),
      allowNull: true,
      enum: ['user', 'admin'],
      defaultValue: 'user'
    }),
      await queryInterface.addColumn('users', 'mobile_no', {
        type: Sequelize.STRING(255),
        allowNull: true,
      })
    await queryInterface.addColumn('users', 'bio', {
      type: Sequelize.STRING(255),
      allowNull: true,
    }),
      await queryInterface.addColumn('users', 'profile_url', {
        type: Sequelize.STRING(255),
        allowNull: true,
      }),
      await queryInterface.addColumn('users', 'is_account', {
        type: Sequelize.STRING(255),
        allowNull: true,
        enum: ['public', 'private'],
        defaultValue: 'public',
      }),
      await queryInterface.addColumn('users', 'is_deleted', {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: false,
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role');
    await queryInterface.removeColumn('users', 'mobile_no');
    await queryInterface.removeColumn('users', 'bio');
    await queryInterface.removeColumn('users', 'profile_url');
    await queryInterface.removeColumn('users', 'is_account');
    await queryInterface.removeColumn('users', 'is_deleted');
  }
};
