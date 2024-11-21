// seeders/YYYYMMDDHHMMSS-demo-users.js
'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Вася Терка',
        email: 'vasyaTerka@example.com',
        passwordHash: await bcrypt.hash('терка123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Жора Кастрюлькин',
        email: 'zhoraKastrulkin@example.com',
        passwordHash: await bcrypt.hash('борщ456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Зина Сковородкина',
        email: 'zinaSkovorodkina@example.com',
        passwordHash: await bcrypt.hash('яичница789', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Петя Половник',
        email: 'petyaPolovnik@example.com',
        passwordHash: await bcrypt.hash('суп101112', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Люся Поварешкина',
        email: 'lusyaPovareshkina@example.com',
        passwordHash: await bcrypt.hash('котлета131415', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};