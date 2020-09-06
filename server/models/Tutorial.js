const { Model, DataTypes } = require('sequelize');

class Tutorial extends Model {
  static init(sequelize){
    super.init(
      {
        app_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        app_version: DataTypes.STRING,
        operating_system: DataTypes.STRING,
        operating_system_version: DataTypes.STRING,
        approved: DataTypes.TINYINT,
        created_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'tutorial',
        underscored: true,
        freezeTableName: true,
      }
    );
  }
}

module.exports = Tutorial;