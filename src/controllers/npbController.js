const { v4: uuidv4 } = require('uuid');
const npbService = require("../services/npbServices");
const npbUtils = require("../utils/npbUtils");

async function getAllNpbs(req, res) {
  try {
    const npbs = await npbService.getAllModifiedNpbs();
    res.json(npbs);
  } catch (error) {
    console.error("Error getting npbs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNpb(req, res) {
  try {
    const { name, location } = req.body;

    if (!name || !location ) {
      return res.status(400).json({ error: "Name, location are required" });
    }

    const npb = await npbService.createNpb(name, location);
    res.json(npb);
  } catch (error) {
    console.error("Error creating npb:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNpbById(req, res) {
  const npbId = req.params.id;

  try {
    const npb = await npbService.getNpbById(npbId);

    if (!npb) {
      return res.status(404).json({ error: "NPB not found" });
    }

    const modifiedNpb = npbUtils.modifyNpbDates([npb]);

    res.json(modifiedNpb[0]);
  } catch (error) {
    console.error("Error getting NPB by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNpbByStatus(req, res) {
  const { status } = req.body;

  try {
    const npbs = await npbService.getNpbByStatus(status);
    const modifiedNpbs = npbUtils.modifyNpbDates(npbs);
    res.json(modifiedNpbs);
  } catch (error) {
    console.error("Error getting NPB by status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNpbByLocation(req, res) {
  const { location } = req.body;

  try {
    const npbs = await npbService.getNpbByLocation(location);
    const modifiedNpbs = npbUtils.modifyNpbDates(npbs);
    res.json(modifiedNpbs);
  } catch (error) {
    console.error("Error getting NPB by location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNpbPacket(req, res) {
  try {
    const packets = req.body; // An array of JSON objects

    // Validate that packets is an array
    if (!Array.isArray(packets)) {
      return res.status(400).json({ error: "Packets must be provided as an array" });
    }

    // Create an array to store the results
    const results = [];

    for (const packet of packets) {
      const {
        npb_id,
        http_count,
        https_count,
        rx_count,
        tx_count,
        rx_size,
        tx_size,
        time,
        throughput
      } = packet;

      // Convert the time to Indonesia Time
      const timeInIndonesia = npbUtils.convertToIndonesiaTime(new Date(time));

      // Check if the npb with the provided npb_id exists
      const existingNpb = await npbService.getNpbById(npb_id);
      if (!existingNpb) {
        return res.status(404).json({ error: `Npb with id ${npb_id} not found` });
      }

      const npbPacket = await npbService.createNpbPacket({
        npb_id,
        http_count,
        https_count,
        rx_count,
        tx_count,
        rx_size,
        tx_size,
        time: timeInIndonesia,
        throughput
      });

      results.push(npbPacket);
    }

    console.log("NpbPackets created:", results);
    res.json(results);
  } catch (error) {
    console.error("Error creating NpbPackets:", error);
    res.status(500).json({ error: error.message });
  }
}


async function getNpbPacketByNpbId(req, res) {
  const npbId = req.params.id;

  // Check if npbId is null or undefined
  if (!npbId) {
    return res.status(400).json({ error: 'Npb ID is required.' });
  }

  try {
    const npbPackets = await npbService.getNpbPacketById(npbId);

    if (npbPackets.length === 0) {
      return res.json({ message: `No Npb Packets found for Npb with id ${npbId}` });
    }

    res.json(npbPackets);
  } catch (error) {
    console.error('Error getting npb_packet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllNpbs,
  createNpb,
  getNpbById,
  getNpbByStatus,
  getNpbByLocation,
  createNpbPacket,
  getNpbPacketByNpbId,
};
