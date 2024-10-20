'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const commentLikeDislikes = sequelize.define(
    'CommentLikeDislikes',
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
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'replies',
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
        modelName: 'CommentLikeDislikes'
    }
)

module.exports = commentLikeDislikes
