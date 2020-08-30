// https://sequelize.org/master/manual/validations-and-constraints.html


module.exports = {
    user: function user(queryInterface, Sequelize) {
        return queryInterface.define(
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

            }
        );

    }
};