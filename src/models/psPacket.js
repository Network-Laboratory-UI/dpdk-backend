const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Ps = require("./ps"); // Import Ps model

const PsPacket = db.define(
  "ps_packet",
  {
    packet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ps_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Ps,
        key: "id",
      },
    },
    rstClient_http: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rstServer_http: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rstClient_tls: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rstServer_tls: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_http_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_http_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_http_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_http_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_http_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_http_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_http_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_http_mbuf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_tls_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_tls_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_tls_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_tls_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_tls_drop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_tls_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tx_i_tls_error: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rx_i_tls_mbuf: {
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
    throughput_i_http: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    throughput_i_tls: {
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
    }
  },
  {
    tableName: "ps_packet",
    timestamps: false,
  }
);

db.sync();

module.exports = PsPacket;
