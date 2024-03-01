const configService = require("../services/configServices");

async function createConfig(req, res) {
  try {
    const {
      npbId,
      psId,
      backend_ip,
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
    } = req.body;

    if (
      !npbId ||
      !psId ||
      !backend_ip ||
      !txRingSize ||
      !numMbufs ||
      !mbufCacheSize ||
      !burstSize ||
      !maxTcpPayloadLen ||
      !statFile ||
      !statFileExt ||
      !timerPeriodStats ||
      !timerPeriodSend ||
      !maxPacketLen ||
      !rxRingSize
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const configData = await configService.createConfig(
      npbId,
      psId,
      backend_ip,
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
    );
    res.json(configData);
  } catch (error) {
    console.error("Error creating config data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getConfigById(req, res) {
  const id = req.params.id; // Extract the ID from the route parameters

  try {
    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: "ID must be provided" });
    }

    let configData = await configService.getConfigById(id, "npb");

    if (!configData) {
      configData = await configService.getConfigById(id, "ps");
    }

    if (!configData) {
      return res.status(404).json({ error: `Config Data not found` });
    }

    res.json(configData);
  } catch (error) {
    console.error("Error getting Config Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createConfig,
  getConfigById,
};