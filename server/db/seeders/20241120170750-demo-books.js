// seeders/YYYYMMDDHHMMSS-demo-books.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Затерянный Город',
        authorName: 'Александр Белов',
        genre: 'Приключения',
        description: 'История о группе исследователей, отправившихся на поиски легендарного затерянного города в джунглях Амазонки.',
        creatorId: 1,
        bookImg: '/pik/1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Тень Воспоминаний',
        authorName: 'Екатерина Соколова',
        genre: 'Драма',
        description: 'Молодая женщина пытается восстановить свою память после трагической аварии, раскрывая тайны своего прошлого.',
        creatorId: 2,
        bookImg: '/pik/2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Код Да Винчи',
        authorName: 'Дэн Браун',
        genre: 'Детектив',
        description: 'Загадочное убийство в Лувре приводит к расследованию, которое раскрывает древние тайны и скрытые символы.',
        creatorId: 3,
        bookImg: '/pik/3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '1984',
        authorName: 'Джордж Оруэлл',
        genre: 'Антиутопия',
        description: 'Классический роман о тоталитарном обществе, где свобода мысли подавлена, а Большой Брат следит за каждым.',
        creatorId: 4,
        bookImg: '/pik/4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Гордость и Предубеждение',
        authorName: 'Джейн Остин',
        genre: 'Классика',
        description: 'История о любви, предрассудках и социальных условностях в Англии XIX века.',
        creatorId: 5,
        bookImg: '/pik/5.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};