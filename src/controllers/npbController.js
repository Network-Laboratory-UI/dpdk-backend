const { v4: uuidv4 } = require("uuid");
const npbService = require("../services/npbServices");
const npbUtils = require("../utils/npbUtils");

async function getAllNpbs(req, res) {
  try {
    const npbs = await npbService.getAllModifiedNpbs();
    res.json(npbs.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (error) {
    console.error("Error getting npbs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNpb(req, res) {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
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
      return res
        .status(400)
        .json({ error: "Packets must be provided as an array" });
    }

    // Create an array to store the results
    const results = [];

    for (const packet of packets) {
      const {
        npb_id,
        http_count,
        https_count,
        no_match,
        rx_0_count,
        tx_0_count,
        rx_0_size,
        tx_0_size,
        rx_0_drop,
        rx_0_error,
        tx_0_error,
        rx_0_mbuf,
        rx_1_count,
        tx_1_count,
        rx_1_size,
        tx_1_size,
        rx_1_drop,
        rx_1_error,
        tx_1_error,
        rx_1_mbuf,
        time,
        throughput,
      } = packet;

      // Check if the npb with the provided npb_id exists
      const existingNpb = await npbService.getNpbById(npb_id);
      if (!existingNpb) {
        return res
          .status(404)
          .json({ error: `Npb with id ${npb_id} not found` });
      }

      const npbPacket = await npbService.createNpbPacket({
        npb_id,
        http_count,
        https_count,
        no_match,
        rx_0_count,
        tx_0_count,
        rx_0_size,
        tx_0_size,
        rx_0_drop,
        rx_0_error,
        tx_0_error,
        rx_0_mbuf,
        rx_1_count,
        tx_1_count,
        rx_1_size,
        tx_1_size,
        rx_1_drop,
        rx_1_error,
        tx_1_error,
        rx_1_mbuf,
        time,
        throughput,
      });

      results.push(npbPacket);
    }

    // Send success message
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error creating NpbPackets:", error);
    res.status(500).json({ error: error.message });
  }
}

async function geTotalNpbPacketByNpbId(req, res) {
  const npbId = req.params.id;

  // Check if npbId is null or undefined
  if (!npbId) {
    return res.status(400).json({ error: "Npb ID is required." });
  }

  try {
    const npbPackets = await npbService.getTotalNpbPacketById(npbId);

    if (npbPackets.length === 0) {
      return res.json({
        message: `No Npb Packets found for Npb with id ${npbId}`,
      });
    }

    res.json(npbPackets);
  } catch (error) {
    console.error("Error getting npb_packet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNpbPacketByNpbId(req, res) {
  const npbId = req.params.id;

  // Check if npbId is null or undefined
  if (!npbId) {
    return res.status(400).json({ error: "Npb ID is required." });
  }

  try {
    const npbPackets = await npbService.getNpbPacketById(npbId);

    if (npbPackets.length === 0) {
      return res.json({
        message: `No Npb Packets found for Npb with id ${npbId}`,
      });
    }

    res.json(npbPackets);
  } catch (error) {
    console.error("Error getting npb_packet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNpbPacketByNpbIdWithPagination(req, res) {
  const npbId = req.params.id;
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);

  // Check if npbId is null or undefined
  if (!npbId) {
    return res.status(400).json({ error: "Npb ID is required." });
  }

  try {
    const { count, rows: npbPackets } = await npbService.getNpbPacketByIdWithPagination(
      npbId,
      page,
      pageSize
    ); // Pass pagination parameters to service

    if (npbPackets.length === 0) {
      return res.json({
        message: `No Npb Packets found for Npb with id ${npbId}`,
      });
    }

    res.json({ count, npbPackets }); // Send response with packets and total count

  } catch (error) {
    console.error("Error getting npb_packet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNpbHeartbeat(req, res) {
  try {
    const heartbeats = req.body;

    // Validate that heartbeats is an array
    if (!Array.isArray(heartbeats)) {
      return res
        .status(400)
        .json({ error: "Heartbeats must be provided as an array" });
    }

    // Create an array to store the results
    const results = [];

    // Iterate over each heartbeat object in the array
    for (const heartbeat of heartbeats) {
      const { npb_id, time } = heartbeat;

      // Check if the npb with the provided npb_id exists
      const existingNpb = await npbService.getNpbById(npb_id);
      if (!existingNpb) {
        return res
          .status(404)
          .json({ error: `Npb with id ${npb_id} not found` });
      }

      // Create a new heartbeat record
      const newHeartbeat = await npbService.createHeartbeat(npb_id, time);
      results.push(newHeartbeat);
    }

    // Send success response with created heartbeat records
    res.status(200).json({
      message: "Heartbeats created successfully",
      heartbeats: results,
    });
  } catch (error) {
    console.error("Error creating Npb heartbeat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getNpbHeartbeatByNpbId(req, res) {
  const npbId = req.params.id;

  // Check if npbId is null or undefined
  if (!npbId) {
    return res.status(400).json({ error: "Npb ID is required." });
  }

  try {
    const npbHeartbeat = await npbService.getAllHeartbeatbyNpbId(npbId);

    if (npbHeartbeat.length === 0) {
      return res.json({
        message: `No Npb Heartbeat found for Npb with id ${npbId}`,
      });
    }

    res.json(npbHeartbeat);
  } catch (error) {
    console.error("Error getting npb_heartbeat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function performHeartbeatCheck() {
  try {
    console.log("Running heartbeat check...");
    // Fetch all modified npb objects
    let modifiedNpbs = await npbService.getAllModifiedNpbs();

    // Sort modified npb objects by ID to ensure consistent processing order
    modifiedNpbs.sort((a, b) => a.id - b.id);

    // Create an array of promises for updating npb statuses
    const updatePromises = modifiedNpbs.map(async (npb) => {
      const npb_id = npb.id;
      const isHeartbeatAlive = await npbService.getNpbHeartbeatByNpbId(npb_id);
      console.log(`Heartbeat for npb_id ${npb_id} is alive:`, isHeartbeatAlive);

      // Update npb status based on heartbeat check result
      if (isHeartbeatAlive) {
        // Heartbeat is alive, set status to Active
        await npbService.updateNpbStatus(npb_id, "Active");
        console.log(`Status updated for npb_id ${npb_id} to Active`);
      } else {
        // Heartbeat is not alive, set status to Inactive
        await npbService.updateNpbStatus(npb_id, "Inactive");
        console.log(`Status updated for npb_id ${npb_id} to Inactive`);
      }
    });

    // Wait for all update promises to complete
    await Promise.all(updatePromises);

    console.log("All npb statuses updated successfully.");
  } catch (error) {
    console.error("Error in heartbeat check:", error);
  }
}

module.exports = {
  getAllNpbs,
  createNpb,
  getNpbById,
  getNpbByStatus,
  getNpbByLocation,
  createNpbPacket,
  geTotalNpbPacketByNpbId,
  getNpbPacketByNpbId,
  getNpbPacketByNpbIdWithPagination,
  createNpbHeartbeat,
  getNpbHeartbeatByNpbId,
  performHeartbeatCheck,
};
