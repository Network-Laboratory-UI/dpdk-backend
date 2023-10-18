const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Ps = require("./ps"); // Import Ps model

const PsPacket = db.define("ps_packet", {
  packet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ps_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ps,
      key: 'id'
    },
  },
  http_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  https_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rx_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tx_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rx_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tx_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  http_hit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  https_hit_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tcp_reset_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { 
    tableName: "ps_packet",
    timestamps: false,
});

(async () => {
  try {
    await db.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = PsPacket;
