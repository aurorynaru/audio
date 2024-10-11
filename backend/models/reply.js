'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const user = require('./user')
const replies = sequelize.define(
    'Replies',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Audio',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        parentReplyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Replies',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
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
    { freezeTableName: true, modelName: 'Replies' }
)

module.exports = replies
