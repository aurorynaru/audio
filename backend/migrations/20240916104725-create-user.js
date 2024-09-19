'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userName: {
                type: Sequelize.STRING,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            password: {
                type: Sequelize.STRING
            },
            profilePicture: {
                type: Sequelize.STRING,
                allowNull: false
            },
            bio: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('User')
    }
}
