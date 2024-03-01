const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Npb = require("./npb"); // Import Npb model

const NpbHeartbeat = db.define(
  "heartbeat",
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
        model: Npb,
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

// Define association
NpbHeartbeat.belongsTo(Npb, { foreignKey: "npb_id" });

module.exports = NpbHeartbeat;

