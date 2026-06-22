'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('users', 'account_band', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false,
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'account_band');
  }
};
