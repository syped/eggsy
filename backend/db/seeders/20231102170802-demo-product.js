"use strict";

const { Product } = require("../models");

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

    await Product.bulkCreate([
      {
        userId: 1,
        name: "Logitech G Pro X Superlight Wireless Gaming Mouse",
        category: "mouse",
        description:
          "Less than 63 grams. Advanced low-latency LIGHTSPEED wireless. Sub-micron precision with HERO 25K sensor. Remove all obstacles with our lightest and fastest PRO mouse ever.",
        price: 159.99,
      },
      {
        userId: 1,
        name: "G502-HERO",
        category: "mouse",
        description:
          "Engineered for advanced gaming performance. G502 HERO features HERO 25K gaming sensor with sub-micron precision tracking, customizable LIGHTSYNC RGB, onboard profiles, repositionable weights and more.",
        price: 79.99,
      },
      {
        userId: 1,
        name: "PRO Keyboard",
        category: "keyboard",
        description:
          "The tournament-proven PRO gaming keyboard, now with advanced GX Blue Clicky mechanical switches. Built to win in collaboration with the world’s top esports athletes.",
        price: 129.99,
      },
      {
        userId: 2,
        name: "RAZER DEATHADDER V2",
        category: "mouse",
        description:
          "Witness an icon reborn with the Razer DeathAdder V2—an ergonomic mouse designed with deadly curves and killer lines for a weapon that handles like no other. With next-gen sensor and switches packed into a lighter form factor, a new era of high-performance gaming has already taken shape.",
        price: 69.99,
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
    options.tableName = "Products";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
