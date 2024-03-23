const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");

const User = db.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
    timestamps: false,
});

db.sync();
module.exports = User;