'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const replies = require('./reply')

const audio = sequelize.define(
    'Audio',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        source: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        audioKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coverKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    },
    { paranoid: true, modelName: 'Audio', freezeTableName: true }
)

audio.hasMany(replies, { foreignKey: 'postId' })
replies.belongsTo(audio, { foreignKey: 'postId' })

module.exports = audio
