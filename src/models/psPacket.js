const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Ps = require("./ps"); // Import Ps model

const PsPacket = db.define(
  "ps_packet",
  {
    packet_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
    },
    ps_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Ps,
        key: "id",
      },
    },
    rstClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rstServer: {
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
    tableName: "ps_packet",
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

module.exports = PsPacket;
