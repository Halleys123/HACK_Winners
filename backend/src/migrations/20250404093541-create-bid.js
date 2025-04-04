'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TenderDetails',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      contractorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      bidPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      documents: {
        type: Sequelize.JSON
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      remarks: {
        type: Sequelize.TEXT
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

  async down(queryInterface) {
    await queryInterface.dropTable('Bids');
  }
};
