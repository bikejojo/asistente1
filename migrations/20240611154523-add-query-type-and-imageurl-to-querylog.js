'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('query_logs', 'type', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'text' // 'text' or 'image'
    });
    await queryInterface.addColumn('query_logs', 'imageUrl', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('query_logs', 'type');
    await queryInterface.removeColumn('query_logs', 'imageUrl');
  }
};
