"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, { foreignKey: "creatorId" });
      Book.hasMany(models.Comment, { foreignKey: "bookId" });
      Book.hasMany(models.Favorite, { foreignKey: "bookId" });
      Book.hasMany(models.Rating, { foreignKey: "bookId" });
    }
  }
  Book.init(
    {
      bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: DataTypes.STRING,
      description: DataTypes.TEXT,
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      bookImg: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
