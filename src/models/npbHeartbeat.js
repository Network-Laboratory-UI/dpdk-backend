const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const npb = require("./npb"); // Import npb model

const npbHeartbeat = db.define(
  "npb_heartbeat",
  {
    heartbeat_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
    },
    npb_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: npb,
        key: "id",
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "npb_heartbeat",
    timestamps: false,
  }
);

db.sync();

module.exports = npbHeartbeat;
