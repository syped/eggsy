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
        userId: 2,
        name: "G305",
        category: "mouse",
        description:
          "LIGHTSPEED wireless gaming mouse designed for serious performance with latest technology innovations. Impressive 250-hour battery life. Now in a variety of vibrant colors.",
        price: 59.99,
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
        userId: 1,
        name: "G915 TKL",
        category: "keyboard",
        description:
          "A breakthrough in design and engineering, now in black and white colorways. G915 TKL features LIGHTSPEED pro-grade wireless, advanced LIGHTSYNC RGB, and high-performance low-profile mechanical switches.",
        price: 229.99,
      },
      {
        userId: 2,
        name: "G715",
        category: "keyboard",
        description:
          "From the Aurora Collection, G715 is a gaming-grade LIGHTSPEED wireless and Bluetooth® keyboard designed for comfort with included cloud-soft palm rest.",
        price: 199.99,
      },
      {
        userId: 1,
        name: "PRO X 2 LIGHTSPEED",
        category: "headset",
        description:
          "Designed with pros. Engineered to win. PRO X 2 LIGHTSPEED headset features pro-grade sound, LIGHTSPEED wireless, and supreme comfort for the highest levels of competition.",
        price: 249.99,
      },
      {
        userId: 1,
        name: "ASTRO A50 WIRELESS",
        category: "headset",
        description:
          "With revolutionary design, advanced acoustics and ergonomic comfort, A50 Wireless + Base Station delivers an unforgettable gaming experience.",
        price: 299.99,
      },
      {
        userId: 2,
        name: "G733",
        category: "headset",
        description:
          "Wireless gaming headset designed for performance and comfort. Outfitted with all the surround sound, voice filters, and advanced lighting you need to look, sound, and play with more style than ever.",
        price: 149.99,
      },
      {
        userId: 1,
        name: "TUF Gaming VG249QL3A",
        category: "monitor",
        description:
          "The 23.8-inch TUF Gaming VG249QL3A Full HD gaming monitor featuring a Fast IPS panel for 180 Hz gaming. ASUS Extreme Low Motion Blur and AMD FreeSync™ Premium, G-SYNC compatible, VESA AdaptiveSync technologies enables buttery-smooth gaming.",
        price: 309.99,
      },
      {
        userId: 1,
        name: "TUF Gaming VG27AQ",
        category: "monitor",
        description:
          "TUF Gaming VG27AQ is a 27-inch, QHD (2560x1440), HDR IPS display with an ultrafast 165Hz* designed for professional gamers and those seeking immersive gameplay. Those are some serious specs, but not even the most exciting thing the VG27AQ has in store.",
        price: 189.99,
      },
      {
        userId: 2,
        name: "TUF Gaming VG279QM",
        category: "monitor",
        description:
          "27-inch Full HD (1920 x 1080) Fast IPS gaming monitor with ultrafast 280*Hz refresh rate designed for professional gamers and immersive gameplay",
        price: 299.99,
      },
      {
        userId: 2,
        name: "RAZER DEATHADDER V2",
        category: "mouse",
        description:
          "Witness an icon reborn with the Razer DeathAdder V2—an ergonomic mouse designed with deadly curves and killer lines for a weapon that handles like no other. With next-gen sensor and switches packed into a lighter form factor.",
        price: 69.99,
      },
      {
        userId: 2,
        name: "RAZER BASILISK V3",
        category: "mouse",
        description:
          "Create, control, and champion your playstyle with the new Razer Basilisk V3—the quintessential ergonomic gaming mouse for customized performance",
        price: 69.99,
      },
      {
        userId: 2,
        name: "RAZER VIPER V2 PRO",
        category: "mouse",
        description:
          "Esports has a new apex predator. As successor to the award-winning Razer Viper Ultimate, our latest evolution is more than 20% lighter and armed with all-round upgrades for enhanced performance.",
        price: 149.99,
      },
      {
        userId: 2,
        name: "THE RAZER HUNTSMAN V3 PRO",
        category: "keyboard",
        description:
          "Reach your full esports potential with the Razer Huntsman V3 Pro line—analog optical keyboards made for the pro in you.",
        price: 249.99,
      },
      {
        userId: 2,
        name: "RAZER BLACKWIDOW V4 PRO",
        category: "keyboard",
        description:
          "Whether you seek greater control, customization, or immersion, get it all with a mechanical keyboard that’s the complete package.",
        price: 229.99,
      },
      {
        userId: 2,
        name: "RAZER DEATHSTALKER V2 PRO",
        category: "keyboard",
        description:
          "Introducing our fastest low-profile optical keyboards, optimized for top-tier performance and durability. Featuring all-new low-profile switches within a lean, durable casing, experience ultra-responsive gaming designed for long-lasting ergonomic use.",
        price: 249.99,
      },
      {
        userId: 2,
        name: "RAZER BLACKSHARK V2 PRO",
        category: "headset",
        description:
          "Outfitted with a triple threat of exceptional audio clarity, extreme comfort, and incredible noise isolation, the Razer BlackShark V2 line ensures you’ll always be within earshot of your next victory.",
        price: 199.99,
      },
      {
        userId: 2,
        name: "RAZER BARRACUDA",
        category: "headset",
        description:
          "Whether you’re indoors or outdoors, it’s all the same to the Razer Barracuda—a wireless hybrid headset designed for both home gaming and mobile entertainment.",
        price: 159.99,
      },
      {
        userId: 2,
        name: "RAZER KRAKEN V3",
        category: "headset",
        description:
          "Color your immersion with the Razer Kraken V3—a PC gaming headset powered by Razer Chroma™ RGB for dynamic lighting integrated with your games and devices.",
        price: 79.99,
      },
      {
        userId: 2,
        name: "ROG Swift Pro PG248QP",
        category: "monitor",
        description:
          "The ROG Swift Pro PG248QP is the world's fastest esports gaming monitor. Designed for professional FPS gamers, with a 24.1-inch Esports-TN (E-TN) panel boasting a 540 Hz (OC) refresh rate and built-in NVIDIA® G-SYNC® processor",
        price: 899.99,
      },
      {
        userId: 2,
        name: "ROG Strix XG259QN",
        category: "monitor",
        description:
          "ROG Strix XG259QN eSports Gaming Monitor — 25 inch (24.5 inch viewable) FHD (1920 x 1080), 380 Hz (OC), Fast IPS, 1 ms GTG (0.3 ms minimum), HDR",
        price: 449.99,
      },
      {
        userId: 2,
        name: "ROG Strix XG256Q",
        category: "monitor",
        description:
          "ROG Strix XG256Q Gaming Monitor – 24.5 inch Full HD (1920 x 1080), Fast IPS, 180Hz (Above 144Hz), 1ms GTG, Extreme Low Motion Blur, G-Sync compatible, FreeSync Premium technology, DisplayHDR™ 400, Tripod socket",
        price: 199.99,
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
