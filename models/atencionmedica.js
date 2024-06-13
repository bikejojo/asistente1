'use strict';
module.exports = (sequelize, DataTypes) => {
  const AtencionMedica = sequelize.define('AtencionMedica', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reserved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    iddoctor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idpatient: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'atencion_medica', // Asegúrate de usar el nombre correcto de la tabla
    timestamps: false
  });
  return AtencionMedica;
};
