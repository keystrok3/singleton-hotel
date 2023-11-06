
/** User Model */

const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');


const user_table = sequelize.define("user_table", {
    // Model attributes: firstName, lastName, username, date_created, password
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Must be a valid email address" }
        }
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },

    resetPasswordToken: {
        type: DataTypes.STRING(64),

        get() {
            return this.getDataValue('resetPasswordToken');
        }
    },

    resetPasswordExpire: {
        type: DataTypes.INTEGER
    }

}, {
    freezeTableName: true
});


module.exports = { user_table };
