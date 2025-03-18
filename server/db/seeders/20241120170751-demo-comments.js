// seeders/YYYYMMDDHHMMSS-demo-comments.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        commentText: 'Захватывающее путешествие! Книга держит в напряжении до самого конца.',
        userId: 1,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Замечательная книга, читается на одном дыхании. Очень рекомендую!',
        userId: 2,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Невероятно увлекательный детектив! Не мог оторваться от чтения.',
        userId: 3,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Потрясающая антиутопия, заставляет задуматься о многих вещах.',
        userId: 4,
        bookId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Классика, которая никогда не устареет. Прекрасно написанная история!',
        userId: 5,
        bookId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Отличная книга! Очень понравился сюжет и герои.',
        userId: 1,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Рекомендую всем любителям приключений и загадок!',
        userId: 2,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Впечатляет глубина проработки характеров и событий.',
        userId: 3,
        bookId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'После прочтения осталась под большим впечатлением!',
        userId: 5,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};