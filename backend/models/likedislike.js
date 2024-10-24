'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const likeDislikes = sequelize.define(
    'LikeDislikes',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        isLike: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'audio',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
    {
        freezeTableName: true,
        modelName: 'LikeDislikes'
    }
)

module.exports = likeDislikes
// npx sequelize-cli model:generate --name commentLikeDislike --attributes
