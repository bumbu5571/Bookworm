"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          email: "pip@mail.ru",
          password: await bcrypt.hash("123456789", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ivan",
          email: await bcrypt.hash("123asd", 10),
          password: "123asd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    Example: await queryInterface.bulkDelete("Users", null, {});
  },
};
