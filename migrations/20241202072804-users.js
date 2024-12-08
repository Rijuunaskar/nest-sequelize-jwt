'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: { tableName: 'roles' }, key: 'id' },
        },
        profile_image: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        primary_mobile: {
          type: Sequelize.BIGINT(10),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue : ''
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
    await queryInterface.dropTable('users');
  }
};
