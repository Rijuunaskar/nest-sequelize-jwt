'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id:1,
        name:'super_admin',
        label:'Super Admin'
      },
      {
        id:2,
        name:'admin',
        label:'Admin'
      },
      {
        id:3,
        name:'user',
        label:'User'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
