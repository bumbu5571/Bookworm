// seeders/YYYYMMDDHHMMSS-demo-users.js
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Вася Терка',
        email: 'vasyaTerka@example.com',
        password: await bcrypt.hash('терка123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Жора Кастрюлькин',
        email: 'zhoraKastrulkin@example.com',
        password: await bcrypt.hash('борщ456', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Зина Сковородкина',
        email: 'zinaSkovorodkina@example.com',
        password: await bcrypt.hash('яичница789', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Петя Половник',
        email: 'petyaPolovnik@example.com',
        password: await bcrypt.hash('суп101112', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Люся Поварешкина',
        email: 'lusyaPovareshkina@example.com',
        password: await bcrypt.hash('котлета131415', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};