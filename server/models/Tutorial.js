const { Model, DataTypes } = require('sequelize');

class Tutorial extends Model {
  static init(sequelize) {
    super.init(
      {
        appoioName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING(11),
          allowNull: false,
        },
        appVersion: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        operatingSystem: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        operatingSystemVersion: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        approved: {          
          type: DataTypes.TINYINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'tutorial',
        freezeTableName: true,
        updatedAt: false,
        deletedAt: false,
      }
    );
  }
}

module.exports = Tutorial;
