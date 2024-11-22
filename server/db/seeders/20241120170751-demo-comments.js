// seeders/YYYYMMDDHHMMSS-demo-comments.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        commentText: 'Я был в шоке от этой книги! Мы с женой перечитывали 12 раз!',
        userId: 1,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Битва котлет - это нечто! Браво!',
        userId: 1,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'После прочтения я начал видеть котлеты в кошмарах. Спасибо автору!',
        userId: 2,
        bookId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Очень реалистичное описание будней в бассейне!',
        userId: 2,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Теперь я знаю, куда деваются все носки!',
        userId: 2,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Теперь я знаю, куда деваются мои носки. Гениально!',
        userId: 3,
        bookId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Никогда не думал, что уборка может быть такой захватывающей!',
        userId: 3,
        bookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Иван Кулебякин - герой нашего времени! Хочу продолжения!',
        userId: 4,
        bookId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentText: 'Плакал над судьбой картошки. Очень трогательно!',
        userId: 5,
        bookId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};