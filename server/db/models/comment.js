'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false
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
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};