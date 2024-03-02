const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Npb = require("./npb"); // Import Npb model
const Ps = require("./ps"); // Import Ps model

const ConfigData = db.define(
  "config_data",
  {
    configId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
    },
    maxPacketLen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rxRingSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    txRingSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numMbufs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mbufCacheSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    burstSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxTcpPayloadLen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    npbId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Npb,
        key: "id",
      },
    },
    psId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Ps,
        key: "id",
      },
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statFileExt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timerPeriodStats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timerPeriodSend: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "config_data",
    timestamps: false,
  }
);

db.sync();

module.exports = ConfigData;
