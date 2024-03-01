const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Ps = require("./ps"); // Import Ps model

const PsBlockedList = db.define(
  "ps_blocked_list",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip_add: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hit_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    tableName: "ps_blocked_list",
    timestamps: false,
  }
);

(async () => {
  try {
    await db.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = PsBlockedList;
