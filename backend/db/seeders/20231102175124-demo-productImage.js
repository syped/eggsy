"use strict";

const { ProductImage } = require("../models");

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

    await ProductImage.bulkCreate([
      {
        productId: 1,
        url: "https://m.media-amazon.com/images/I/51uy8gOG-iL._AC_UF894,1000_QL80_.jpg",
        preview: true,
      },
      {
        productId: 2,
        url: "https://i.rtings.com/assets/products/7szXRWVr/logitech-g502-x/design-large.jpg",
        preview: true,
      },
      {
        productId: 3,
        url: "https://m.media-amazon.com/images/I/714ehqraXCL.jpg",
        preview: true,
      },
      {
        productId: 4,
        url: "https://i.rtings.com/assets/products/2nCgJbdP/razer-deathadder-essential/design-medium.jpg",
        preview: true,
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

    options.tableName = "ProductImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        productId: {
          [Op.in]: [1, 2, 3, 4],
        },
      },
      {}
    );
  },
};
