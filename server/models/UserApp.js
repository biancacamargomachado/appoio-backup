const { Model, Datatypes } = require('sequelize');

class UserApp extends Model {
  static init(sequelize){
    super.init(
      {
        id_app: Datatypes.INTEGER,
        id_user: Datatypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'userApps',
        underscored: true,
        freezeTableName: true,
      }
    );
  }
}