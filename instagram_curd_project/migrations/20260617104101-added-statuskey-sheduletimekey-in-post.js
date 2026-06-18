'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'published',
    });

    await queryInterface.addColumn('posts', 'schedule_time', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('posts', 'schedule_time');
    await queryInterface.removeColumn('posts', 'status');
  },
};