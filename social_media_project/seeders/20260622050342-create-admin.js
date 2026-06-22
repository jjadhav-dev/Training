'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      username: 'admin_11',
      email: 'admin@example.com',
      password: await bcrypt.hash('Admin@123', 10), 
      is_verify: 'true',
      is_active: true,
      is_account: true,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { role: 'admin' }, {});
  }
};
