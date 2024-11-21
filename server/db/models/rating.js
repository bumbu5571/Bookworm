'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, { foreignKey: 'userId' });
      Rating.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Rating.init({
    ratingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Book',
        key: 'bookId'
      }
    },
    ratingValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};