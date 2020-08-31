// https://sequelize.org/master/manual/validations-and-constraints.html

const bcrypt = require("bcrypt");


module.exports = {
    user: function user(queryInterface, Sequelize) {
        var User = queryInterface.define(
            "user",
            {
                name: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                email: {
                    primaryKey: true,
                    type: Sequelize.STRING(50),
                    allowNull: null,
                },
                password: {
                    type: Sequelize.STRING(50),
                    allowNull: null,
                },
            },
            {
                timestamps: false,
                freezeTableName: true,
                hooks: {
                    beforeCreate: (user) => {
                        const salt = bcrypt.genSaltSync(8);
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        );

        User.prototype.validPassword = function (password) {
            bcrypt.compareSync(password, this.password);
        }

        return User;

    }
};