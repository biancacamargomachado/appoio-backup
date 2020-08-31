
const bcrypt = require("bcrypt");

// Função que retorna uma representação do usuário do banco de dados
// Senha criptografada antes da criação automaticamente
module.exports = {
    user: function user(queryInterface, ORM) {
        var User = queryInterface.define(
            'user',
            {
                name: {
                    type: ORM.STRING(50),
                    allowNull: false,
                },
                email: {
                    primaryKey: true,
                    type: ORM.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: ORM.STRING(50),
                    allowNull: false,
                }
            },
            {
                timestamps: false,
                freezeTableName: true,
                hooks: {
                    beforeCreate: (user)=>{
                        const salt = bcrypt.genSaltSync(8);
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        );

        User.prototype.validPassword = function(password){
            bcrypt.compareSync(password, this.password);
        };

        return User;
    }
};