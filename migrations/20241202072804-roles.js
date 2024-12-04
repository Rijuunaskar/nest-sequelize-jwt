'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('roles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        label: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        created_by: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        updated_by: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      })
  },

  async down(queryInterface, Sequelize){
    await queryInterface.dropTable('roles');
  }
};
