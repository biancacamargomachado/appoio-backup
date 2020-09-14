const { Model, DataTypes } = require('sequelize');

class Step extends Model {
  static init(sequelize) {
    super.init(
      {
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        videoURL: {
          type: DataTypes.STRING(500),
          allowNull: true
        },
        imgURL: {
          type: DataTypes.STRING(500),
          allowNull: true
        },
      },
      {
        sequelize,
        modelName: 'step',
        freezeTableName: true,
        timestamps: false
      }
    );
  }
}

module.exports = Step;
