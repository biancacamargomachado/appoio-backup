const { Model, DataTypes } = require('sequelize');

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'tag',
        freezeTableName: true,
        timestamps: false
      }
    );
  }
}

module.exports = Tag;
