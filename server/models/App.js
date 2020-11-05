const { Model, DataTypes } = require('sequelize');

class App extends Model{
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        }
      },
      {
        sequelize,
        modelName: 'app',
        freezeTableName: true,
        timestamps: false
      }
    );
  }
}

module.exports = App;