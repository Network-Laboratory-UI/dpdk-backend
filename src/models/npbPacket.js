const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Npb = require("./npb"); // Import Npb model

const NpbPacket = db.define(
  "npb_packet",
  {
    packet_id: {
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
    http_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    https_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    no_match: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_0_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_0_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_0_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_0_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_0_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_0_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_0_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_0_mbuf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_1_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_1_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_1_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_1_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_1_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_1_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_1_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_1_mbuf: {
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
  },
  {
    tableName: "npb_packet",
    timestamps: false,
  }
);

(async () => {
  try {
    await db.sync();

  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = NpbPacket;
