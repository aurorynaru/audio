'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('LikeDislikes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            isLike: {
                type: Sequelize.BOOLEAN,
                allowNull: false
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
            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Audio',
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
        // await queryInterface.addConstraint('LikeDislikes', {
        //     fields: ['userId', 'postId'],
        //     type: 'unique',
        //     name: 'unique_user_post'
        // })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('LikeDislikes')
    }
}
