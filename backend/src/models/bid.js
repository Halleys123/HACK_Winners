'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    static associate(models) {
      Bid.belongsTo(models.TenderDetail, { foreignKey: 'tenderId', as: 'tender' });
      Bid.belongsTo(models.User, { foreignKey: 'contractorId', as: 'contractor' });
    }
  }

  Bid.init({
    tenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'TenderDetails', key: 'id' }
    },
    contractorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    bidPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true 
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Bid',
  });

  return Bid;
};
