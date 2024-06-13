'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('query_logs', 'query', {
      type: Sequelize.TEXT,
      allowNull: true // Permitir valores nulos
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('query_logs', 'query', {
      type: Sequelize.TEXT,
      allowNull: false // Revertir a no permitir valores nulos si se deshace la migración
    });
  }
};
