const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dpdkDatabase");
const Npb = require("./npb"); // Import Npb model

const ConfigData = db.define("config_data", {
  configId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Npb,
      key: 'id'
    },
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
}, {
  tableName: "config_data",
  timestamps: false,
});

(async () => {
  try {
    await db.sync();

  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = ConfigData;
