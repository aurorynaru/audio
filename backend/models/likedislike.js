'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likeDislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  likeDislike.init({
    isLike: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'likeDislike',
  });
  return likeDislike;
};