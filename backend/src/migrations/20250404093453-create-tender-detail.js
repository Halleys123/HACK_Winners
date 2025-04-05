'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TenderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      tenderNumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      estimatedCost: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM,
        values:['Infrastructure', 'IT Services', 'Consultancy', 'Manufacturing']
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'INR'
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      submissionDeadline: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('Open', 'Closed', 'Awarded'),
        defaultValue: 'Open'
      },
      documents: {
        type: Sequelize.JSON
      },
    //   closingRemarks: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('TenderDetails');
  }
};
