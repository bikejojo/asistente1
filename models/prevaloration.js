'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prevaloration = sequelize.define('Prevaloration', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inputType: {
      type: DataTypes.STRING,
      allowNull: false, // 'text' or 'image'
    },
    inputText: {
      type: DataTypes.TEXT,
      allowNull: true, // Puede ser null para entradas de imagen
    },
    inputImageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser null para entradas de texto
    },
    assessment: {
      type: DataTypes.TEXT,
      allowNull: false, // Prevaloración generada
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'prevalorations',
    timestamps: true,
  });
  return Prevaloration;
};