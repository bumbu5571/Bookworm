// seeders/YYYYMMDDHHMMSS-demo-users.js
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Иван Петров',
        email: 'ivan.petrov@example.com',
        password: await bcrypt.hash('qwerty123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Елена Смирнова',
        email: 'elena.smirnova@example.com',
        password: await bcrypt.hash('парольПароль', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Алексей Иванов',
        email: 'alex.ivanov@example.com',
        password: await bcrypt.hash('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Мария Кузнецова',
        email: 'maria.kuz@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Дмитрий Попов',
        email: 'dmitry.popov@example.com',
        password: await bcrypt.hash('qwertzuiop', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};