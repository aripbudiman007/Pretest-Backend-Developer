'use strict';
const bcrypt = require('bcrypt')
const fs = require('fs')
const data = JSON.parse(fs.readFileSync("./databases/user.json", {encoding: 'utf-8'})).map(el => {
  let hash = bcrypt.hashSync(el.password,bcrypt.genSaltSync(10))
  return {
    ...el,
    password:hash,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
