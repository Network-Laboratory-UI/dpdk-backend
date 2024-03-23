const Config = require("../models/configData");

async function createConfig(
  npbId,
  psId,
  hostname,
  txRingSize,
  numMbufs,
  mbufCacheSize,
  burstSize,
  maxTcpPayloadLen,
  statFile,
  statFileExt,
  timerPeriodStats,
  timerPeriodSend,
  maxPacketLen,
  rxRingSize
) {
  try {
    const config = await Config.create({
      npbId,
      psId,
      hostname,
      txRingSize,
      numMbufs,
      mbufCacheSize,
      burstSize,
      maxTcpPayloadLen,
      statFile,
      statFileExt,
      timerPeriodStats,
      timerPeriodSend,
      maxPacketLen,
      rxRingSize,
    });
    return config;
  } catch (error) {
    throw new Error("Error creating config");
  }
}

async function getConfigById(id, type) {
  try {
    let config;
    if (type === "npb") {
      // Retrieve NPB configuration based on the provided ID
      config = await Config.findOne({
        where: {
          npbId: id,
        },
      });
    } else if (type === "ps") {
      // Retrieve PS configuration based on the provided ID
      config = await Config.findOne({
        where: {
          psId: id,
        },
      });
    } else {
      throw new Error("Invalid type parameter");
    }

    return config;
  } catch (error) {
    throw new Error("Error finding config by ID");
  }
}

module.exports = {
  createConfig,
  getConfigById,
};
