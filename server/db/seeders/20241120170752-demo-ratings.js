'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ratings', [
      {
        userId: 1,
        bookId: 1,
        ratingValue: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        bookId: 2,
        ratingValue: 3.8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        bookId: 3,
        ratingValue: 5.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        bookId: 4,
        ratingValue: 4.2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        bookId: 5,
        ratingValue: 4.7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ratings', null, {});
  }
};