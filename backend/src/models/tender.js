'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TenderDetail extends Model {
    static associate(models) {
      TenderDetail.belongsTo(models.User, { foreignKey: 'createdBy', as: 'issuer' }); // Admin
      TenderDetail.hasMany(models.Bid, { foreignKey: 'tenderId', as: 'bids' }); // All bids for this tender
    }
  }

  TenderDetail.init({
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    tenderNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    estimatedCost: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    category: {
      type: DataTypes.ENUM('Infrastructure', 'IT Services', 'Consultancy', 'Manufacturing'),
      allowNull: false
    },
    currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'INR' },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
    submissionDeadline: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM('Open', 'Closed', 'Awarded'),
      defaultValue: 'Open'
    },
    // closingRemarks: {
    //     type: DataTypes.TEXT,
    //     allowNull: true
    // },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    documents: { type: DataTypes.JSON, allowNull: true }
  }, {
    sequelize,
    modelName: 'TenderDetail',
  });

  return TenderDetail;
};
