const psService = require("../services/psServices");

async function getAllPSs(req, res) {
  try {
    const psInstances = await psService.getAllModifiedPSs();
    res.json(psInstances);
  } catch (error) {
    console.error("Error getting PS instances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPSById(req, res) {
  const psId = req.params.id;

  try {
    const psInstance = await psService.getPSById(psId);

    if (!psInstance) {
      return res.status(404).json({ error: "PS instance not found" });
    }

    res.json(psInstance);
  } catch (error) {
    console.error("Error getting PS instance by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createPSs(req, res) {
  try {
    const { name, location } = req.body;

    if (!name || !location ) {
      return res.status(400).json({ error: "Name, location are required" });
    }

    const psInstance = await psService.createPS(name, location);
    console.log("PS instance created:", psInstance);
    res.json(psInstance);
  } catch (error) {
    console.error("Error creating PS instance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPSByStatus(req, res) {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status parameter is required" });
    }

    const psInstances = await psService.getPSByStatus(status);
    res.json(psInstances);
  } catch (error) {
    console.error("Error getting PS instances by status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPSByLocation(req, res) {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location parameter is required" });
    }

    const psInstances = await psService.getPSByLocation(location);
    res.json(psInstances);
  } catch (error) {
    console.error("Error getting PS instances by location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createPsPacket(req, res) {
  try {
    const {
      ps_id,
      http_count,
      https_count,
      rx_count,
      tx_count,
      rx_size,
      tx_size,
      time,
      http_hit_count,
      https_hit_count,
      tcp_reset_count
    } = req.body;

    // Check if the ps with provided ps_id exists
    const existingPs = await psService.getPSById(ps_id);
    if (!existingPs) {
      return res.status(404).json({ error: `Ps with id ${ps_id} not found` });
    }

    const psPacket = await psService.createPsPacket({
      ps_id,
      http_count,
      https_count,
      rx_count,
      tx_count,
      rx_size,
      tx_size,
      time,
      http_hit_count,
      https_hit_count,
      tcp_reset_count
    });

    console.log("PsPacket created:", psPacket);
    res.json(psPacket);
  } catch (error) {
    console.error("Error creating PsPacket:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getPsPacketByPsId(req, res) {
  const psId = req.params.id;

  // Check if psId is null or undefined
  if (!psId) {
    return res.status(400).json({ error: 'Ps ID is required.' });
  }

  try {
    const psPackets = await psService.getPsPacketById(psId);

    if (psPackets.length === 0) {
      return res.json({ message: `No Ps Packets found for Ps with id ${psId}` });
    }

    res.json(psPackets);
  } catch (error) {
    console.error('Error getting ps_packet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  getAllPSs,
  getPSById,
  createPSs,
  getPSByStatus,
  getPSByLocation,
  createPsPacket,
  getPsPacketByPsId,
};


