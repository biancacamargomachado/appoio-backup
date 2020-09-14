const { Model, Datatypes } = require('sequelize');

class UserApp extends Model {
  static init(sequelize){
    super.init(
      {
        id_app: {
          type: Datatypes.INTEGER,
          references: { model: 'apps', key: 'id_app' },
        },
        id_user: { 
          type: Datatypes.INTEGER,
          references: { model: 'users', key: 'id' },
        }
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

module.exports = UserApp;