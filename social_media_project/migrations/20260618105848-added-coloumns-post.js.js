'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('posts', 'caption', { type: Sequelize.STRING });
   await queryInterface.addColumn('posts', 'post_type', { type: Sequelize.ENUM('image', 'video'),defaultValue:'image' });
   await queryInterface.addColumn('posts', 'url', { type: Sequelize.STRING });
   await queryInterface.addColumn('posts','is_archived',{type: Sequelize.BOOLEAN,defaultValue:false });
   await queryInterface.addColumn('posts','is_deleted',{type: Sequelize.BOOLEAN,defaultValue:false });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('posts', 'caption');
   await queryInterface.removeColumn('posts', 'post_type');
   await queryInterface.removeColumn('posts', 'url');
   await queryInterface.removeColumn('posts', 'is_archived');
   await queryInterface.removeColumn('posts', 'is_deleted');
  }
};
