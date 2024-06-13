'use strict';
module.exports = (sequelize, DataTypes) => {
  const QueryLog = sequelize.define('QueryLog', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'query_logs',
    timestamps: false,
  });
  return QueryLog;
};
