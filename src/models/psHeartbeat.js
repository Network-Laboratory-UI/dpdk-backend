const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const ps = require("./ps"); // Import PS model

const PsHeartbeat = db.define(
  "psheartbeat",
  {
    heartbeat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ps_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ps,
        key: "id",
      },
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "ps_heartbeat",
    timestamps: false,
  }
);

// Define association
// PsHeartbeat.belongsTo(ps, { foreignKey: "ps_id" });

db.sync();

module.exports = PsHeartbeat;
