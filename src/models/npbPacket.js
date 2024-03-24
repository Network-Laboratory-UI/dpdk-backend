const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Npb = require("./npb"); // Import Npb model

const NpbPacket = db.define(
  "npb_packet",
  {
    packet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    rx_i_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_mbuf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_http_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_o_http_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_http_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_o_http_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_http_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_http_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_o_http_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_http_mbuf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_tls_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_o_tls_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_tls_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_o_tls_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_tls_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_tls_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_o_tls_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_o_tls_mbuf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    throughput_i: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    throughput_o_http: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    throughput_o_tls: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_time: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "npb_packet",
    timestamps: false,
  }
);

db.sync();

module.exports = NpbPacket;
