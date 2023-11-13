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
        url: "https://i.rtings.com/assets/products/R7qRwqbG/logitech-g305-lightspeed/design-medium.jpg",
        preview: true,
      },
      {
        productId: 4,
        url: "https://m.media-amazon.com/images/I/714ehqraXCL.jpg",
        preview: true,
      },
      {
        productId: 5,
        url: "https://cdn.mos.cms.futurecdn.net/LnW9hLcDw9Cy773sAU3iWU.jpg",
        preview: true,
      },
      {
        productId: 6,
        url: "https://i.rtings.com/assets/products/QZF3exYl/logitech-g715/design-medium.jpg",
        preview: true,
      },
      {
        productId: 7,
        url: "https://resource.logitech.com/content/dam/gaming/en/products/pro-x-2-lightspeed/gallery/gallery-1-pro-x-2-lightspeed-gaming-headset-white.png",
        preview: true,
      },
      {
        productId: 8,
        url: "https://m.media-amazon.com/images/I/71dF0Zi6GNL._AC_UF1000,1000_QL80_.jpg",
        preview: true,
      },
      {
        productId: 9,
        url: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6420/6420859_sd.jpg",
        preview: true,
      },
      {
        productId: 10,
        url: "https://assets.techverse.asia/media/2023/09/18/1695013001_6507d889eba68_lIawRwGrt2zwDN8wes4H-small.jpeg",
        preview: true,
      },
      {
        productId: 11,
        url: "https://m.media-amazon.com/images/I/8161u5-EG8L._AC_UF894,1000_QL80_.jpg",
        preview: true,
      },
      {
        productId: 12,
        url: "https://www.asus.com/media/global/products/ixmmljdbmnjhxmh8/P_setting_xxx_0_90_end_500.png",
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
