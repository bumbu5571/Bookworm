// seeders/YYYYMMDDHHMMSS-demo-books.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Влажная Фантазия',
        authorName: 'Гимнастеров И.Б.',
        genre: 'Пародия',
        description: 'История про очень влажные фантазии уборщицы в бассейне',
        creatorId: 1,
        bookImg: "/pik/1.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Котлеты против Пельменей',
        authorName: 'Холодильников С.М.',
        genre: 'Кулинарный боевик',
        description: 'Эпическая битва между котлетами и пельменями за место в морозилке',
        creatorId: 2,
        bookImg: "/pik/2.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Тайна пропавшего носка',
        authorName: 'Стиральная М.А.',
        genre: 'Детектив',
        description: 'Захватывающее расследование исчезновения носков во время стирки',
        creatorId: 3,
        bookImg: "/pik/3.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Марсианские Хроники Ивана Кулебякина',
        authorName: 'Пирожков К.Л.',
        genre: 'Научная фантастика',
        description: 'Приключения русского космонавта на Марсе, где он открывает пельменную',
        creatorId: 4,
        bookImg: "/pik/4.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Любовь и Картошка',
        authorName: 'Огородникова Л.П.',
        genre: 'Романтика',
        description: 'Страстный роман между двумя картофелинами на грядке',
        creatorId: 5,
        bookImg: "/pik/5.png",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};