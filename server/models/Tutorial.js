const { Model, DataTypes } = require('sequelize');
//nomeApoio, categoria, OS, versaoOS, tags
class Tutorial extends Model {
  static init(sequelize) {
    super.init(
      {
        nomeApoio: DataTypes.STRING,
        categoria: DataTypes.STRING,
        OS: DataTypes.STRING,
        versaoOS: DataTypes.INTEGER},
      {
        sequelize,
        modelName: 'tutoriais',
        underscored: true,
        freezeTableName: true,
      }
    );
  }
}

module.exports = Tutorial;

//routes>controller>services>repository>model
