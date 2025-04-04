'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false

      },
      password: {
        type: Sequelize.STRING,
        allowNull:false

      },
      ethAddress: {
        type: Sequelize.STRING,
        allowNull:false
      },
      role: {
        type: Sequelize.ENUM,
        values:['Admin', 'Contractor', 'Transporter'],
        allowNull: false

      },
      kycVerified: {
        type: Sequelize.BOOLEAN,
        allowNull:false

      },
      extraDetails: {
        type: Sequelize.JSON,
        allowNull: true 

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};