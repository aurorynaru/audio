'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Audio', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            source: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            audioKey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            coverKey: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdBy: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true // You can set to `false` if tags are required
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
        await queryInterface.dropTable('Audio')
    }
}
