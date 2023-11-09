"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await Review.bulkCreate([
      {
        productId: 4,
        userId: 1,
        review: "THIS IS SO GOOD",
        stars: 5,
      },
      {
        productId: 3,
        userId: 2,
        review: "THIS IS SO BAD",
        stars: 1,
      },
      {
        productId: 1,
        userId: 3,
        review: "THIS IS SO OKAY",
        stars: 3,
      },
      {
        productId: 1,
        userId: 2,
        review: "testing",
        stars: 2,
      },
      {
        productId: 4,
        userId: 3,
        review: "whyyyy",
        stars: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        productId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
