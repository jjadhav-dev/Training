'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.removeColumn('posts', 'image_url');
   await queryInterface.removeColumn('posts', 'description');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'image_url', { type: Sequelize.STRING });
    await queryInterface.addColumn('posts', 'description', { type: Sequelize.STRING });
  }
};
