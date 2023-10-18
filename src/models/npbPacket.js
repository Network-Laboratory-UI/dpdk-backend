const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Npb = require("./npb"); // Import Npb model

const NpbPacket = db.define("npb_packet", {
  // Fields for NpbPacket table
  packet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  npb_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Npb,
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
  throughput: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "npb_packet",
  timestamps: false,
});

(async () => {
  try {
    await db.sync();

  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = NpbPacket;
