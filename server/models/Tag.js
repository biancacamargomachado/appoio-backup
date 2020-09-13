const { Model, DataTypes } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {type: DataTypes.INTEGER, primaryKey:true },
        name: DataTypes.STRING,
        created_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'tags',
        underscored: true,
        freezeTableName: true,
      }
    );
  }
}

module.exports = Tag;
