'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('categories', [
    {
      name : 'NodeJs'
    },
    {
      name : 'Python'
    },
    {
      name : 'C/C++'
    },
    {
      name : 'PHP Laravel'
    },
    {
      name : 'Go'
    },
    {
      name : 'Flutter'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', {}, null)
  }
};
