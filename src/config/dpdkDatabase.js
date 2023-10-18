const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "postgres", // Set to null or an empty string if no password
    database: "test"
});

module.exports = sequelize;
