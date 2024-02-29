const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "postgres", // Set to null or an empty string if no password
    database: "test",
    timezone: "+07:00",
    logging: false,
});

module.exports = sequelize;
