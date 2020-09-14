const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        birthday: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        uf: {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        timestamps: false
      }
    );
  }
}

module.exports = User;
