const { Model, DataTypes } = require('sequelize');
//passos
class Passo extends Model {
  static init(sequelize) {
    super.init(
      {idPasso: DataTypes.INTEGER,
        idTutorial: DataTypes.INTEGER,
        descrição: DataTypes.VARCHAR,
        videoUrl: DataTypes.VARCHAR,
        imgUrl: DataTypes.VARCHAR
        },
      {
        sequelize,
        modelName: 'passo',
        underscored: true,
        freezeTableName: true,
      }
    );
  }
}

module.exports = Passo;

//routes>controller>services>repository>model
