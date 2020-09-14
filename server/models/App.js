const { Model, DataTypes } = require('sequelize');

class App extends Model{
  static init(sequelize) {
    super.init(
      {
        id_app: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: DataTypes.STRING,
        logo_url: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'apps',
        underscored: true,
        freezeTableName: true,
      }
    );
  }
}

module.exports = App;