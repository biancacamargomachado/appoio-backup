'use strict';
const { Model,DataTypes } = require('sequelize');

class Tutorial extends Model {
    static init(sequelize){
      super.init(
        {
          app_id: {
            type: DataTypes.INTEGER,
            references: { model: 'apps', key: 'id_app' },
          },
          name: DataTypes.STRING,
          category: DataTypes.STRING,
          app_version: DataTypes.STRING,
          operating_system: DataTypes.STRING,
          operating_system_version: DataTypes.STRING,
          approved: DataTypes.TINYINT,
        }, {
          sequelize,
          modelName: 'tutorial',
          underscored: true,
          freezeTableName: true,
        }
      );
    }
}

module.exports = Tutorial;
