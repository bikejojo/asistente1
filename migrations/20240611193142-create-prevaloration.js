'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prevalorations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inputType: {
        type: Sequelize.STRING,
        allowNull: false, // 'text' or 'image'
      },
      inputText: {
        type: Sequelize.TEXT,
        allowNull: true, // Puede ser null para entradas de imagen
      },
      inputImageUrl: {
        type: Sequelize.STRING,
        allowNull: true, // Puede ser null para entradas de texto
      },
      assessment: {
        type: Sequelize.TEXT,
        allowNull: false, // Prevaloración generada
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prevalorations');
  }
};
