'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Replies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            postId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Audio',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            parentReplyId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Replies',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Replies')
    }
}
