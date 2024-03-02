const psService = require("../services/psServices");
const psUtils = require("../utils/psUtils");
const producer = require("../config/kafkaConfig");

async function getAllPSs(req, res) {
  try {
    const psInstances = await psService.getAllModifiedPSs();
    res.json(psInstances.sort((a, b) => a.id - b.id));
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
      return res
        .status(404)
        .json({ error: `PS instance with ID ${psId} not found` });
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

    if (!name || !location) {
      return res.status(400).json({ error: "Name, location are required" });
    }

    const psInstance = await psService.createPS(name, location);
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
        ps_id,
        rstClient,
        rstServer,
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

      // Check if the ps with the provided ps_id exists
      const existingPs = await psService.getPSById(ps_id);
      if (!existingPs) {
        return res.status(404).json({ error: `Ps with id ${ps_id} not found` });
      }

      const psPacket = await psService.createPsPacket({
        ps_id,
        rstClient,
        rstServer,
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

      results.push(psPacket);
    }

    //send success message
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error creating PsPackets:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getTotalPsPacketByPsId(req, res) {
  const psId = req.params.id;

  // Check if psId is null or undefined
  if (!psId) {
    return res.status(400).json({ error: "Ps ID is required." });
  }

  try {
    const psPackets = await psService.getTotalPsPacketById(psId);

    if (psPackets.length === 0) {
      return res.json({
        message: `No Ps Packets found for Ps with id ${psId}`,
      });
    }

    res.json(psPackets);
  } catch (error) {
    console.error("Error getting ps_packet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPsPacketByPsId(req, res) {
  const psId = req.params.id;

  // Check if psId is null or undefined
  if (!psId) {
    return res.status(400).json({ error: "Ps ID is required." });
  }

  try {
    const psPackets = await psService.getPsPacketById(psId);

    if (psPackets.length === 0) {
      return res.json({
        message: `No Ps Packets found for Ps with id ${psId}`,
      });
    }

    res.json(psPackets);
  } catch (error) {
    console.error("Error getting ps_packet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Updated controller function to handle pagination with parameters in the request body
async function getPsPacketByPsIdWithPagination(req, res) {
  const psId = req.params.id;
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);

  // Check if psId is null or undefined
  if (!psId) {
    return res.status(400).json({ error: "Ps ID is required." });
  }

  try {
    const psPackets = await psService.getPsPacketByIdWithPagination(
      psId,
      page,
      pageSize
    ); // Pass pagination parameters to service

    if (psPackets.length === 0) {
      return res.json({
        message: `No Ps Packets found for Ps with id ${psId}`,
      });
    }

    res.json(psPackets);
  } catch (error) {
    console.error("Error getting ps_packet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createPsHeartbeat(req, res) {
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
      const { ps_id, time } = heartbeat;

      // Check if the Ps with the provided Ps_id exists
      const existingPs = await psService.getPSById(ps_id);
      if (!existingPs) {
        return res.status(404).json({ error: `Ps with id ${ps_id} not found` });
      }

      // Create a new heartbeat record
      const newHeartbeat = await psService.createHeartbeat(ps_id, time);
      results.push(newHeartbeat);
    }

    // Send success response with created heartbeat records
    res.status(201).json({
      message: "Heartbeats created successfully",
      heartbeats: results,
    });
  } catch (error) {
    console.error("Error creating Ps heartbeat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPsHeartbeatByPsId(req, res) {
  const psId = req.params.id;

  // Check if psId is null or undefined
  if (!psId) {
    return res.status(400).json({ error: "Ps ID is required." });
  }

  try {
    const psHeartbeat = await psService.getAllHeartbeatbyPsId(psId);

    if (psHeartbeat.length === 0) {
      return res.json({
        message: `No ps Heartbeat found for ps with id ${psId}`,
      });
    }

    res.json(psHeartbeat);
  } catch (error) {
    console.error("Error getting ps_heartbeat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function performHeartbeatCheck() {
  try {
    console.log("Running heartbeat check...");
    // Fetch all modified ps objects
    let modifiedPss = await psService.getAllModifiedPSs();

    // Sort modified ps objects by ID to ensure consistent processing order
    modifiedPss.sort((a, b) => a.id - b.id);

    // Create an array of promises for updating ps statuses
    const updatePromises = modifiedPss.map(async (ps) => {
      const ps_id = ps.id;
      const isHeartbeatAlive = await psService.getPsHeartbeatByPsId(ps_id);
      console.log(`Heartbeat for ps_id ${ps_id} is alive:`, isHeartbeatAlive);

      // Update ps status based on heartbeat check result
      if (isHeartbeatAlive) {
        // Heartbeat is alive, set status to Active
        await psService.updatePsStatus(ps_id, "Active");
        console.log(`Status updated for ps_id ${ps_id} to Active`);
      } else {
        // Heartbeat is not alive, set status to Inactive
        await psService.updatePsStatus(ps_id, "Inactive");
        console.log(`Status updated for ps_id ${ps_id} to Inactive`);
      }
    });

    // Wait for all update promises to complete
    await Promise.all(updatePromises);

    console.log("All ps statuses updated successfully.");
  } catch (error) {
    console.error("Error in heartbeat check:", error);
  }
}

// Controller function to create a PS blocked list
async function createPsBlockedList(req, res) {
  try {
    const { name, domain, ip_add } = req.body;
    // Check if the Ps with the provided Ps_id exists

    // Call the service function to create the PS blocked list
    const createdBlockedList = await psService.createPsBlockedList(
      name,
      domain,
      ip_add
    );

    // Check if the blocked list was successfully created
    if (createdBlockedList) {
      // Send message only if the blocked list was created successfully
      producer.send({
        topic: "dpdk-blocked-list",
        messages: [
          {
            key: "List",
            value: JSON.stringify({ createdBlockedList, type: "create" }),
          },
        ],
      });
    }

    res.status(200).json({ message: "Success", createdBlockedList });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error creating PS blocked list:", error);
    throw new Error("Failed to create PS blocked list");
  }
}


async function getPsBlockedList(req, res) {
  try {
    const psBlockedList = await psService.getAllPsBlockedList();

    if (psBlockedList.length === 0) {
      return res.json({
        message: `No PS blocked list found`,
      });
    }

    res.json(psBlockedList.sort((a, b) => a.id - b.id));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deletePsBlockedList(req, res) {
  try {
    const id = req.params.id;
    const deletedBlockedList = await psService.deletePsBlockedList(id);

    if (!deletedBlockedList) {
      return res
        .status(404)
        .json({ error: `Blocked list with id ${id} not found` });
    }

    // Send message only if the blocked list was deleted successfully
    producer.send({
      topic: "dpdk-blocked-list",
      messages: [
        {
          key: "List",
          value: JSON.stringify({ deletedBlockedList, type: "delete" }),
        },
      ],
    });

    res.status(200).json({
      message: "Blocked list successfully deleted",
      deletedBlockedList,
    });
  } catch (error) {
    console.error("Error deleting blocked list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updatePsBlockedList(req, res) {
  try {
    const id = req.params.id;
    const { name, domain, ip_add } = req.body;
    const updatedBlockedList = await psService.updatePsBlockedList(
      id,
      name,
      domain,
      ip_add
    );
    if (!updatedBlockedList) {
      return res
        .status(404)
        .json({ error: `Blocked list with id ${id} not found` });
    }
    producer.send({
      topic: "dpdk-blocked-list",
      messages: [
        {
          key: "List",
          value: JSON.stringify({ updatedBlockedList, type: "update" }),
        },
      ],
    });
    res.status(200).json({
      message: "Blocked list successfully updated",
      updatedBlockedList,
    });
  } catch (error) {
    console.error("Error updating blocked list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
  getAllPSs,
  getPSById,
  createPSs,
  getPSByStatus,
  getPSByLocation,
  createPsPacket,
  getTotalPsPacketByPsId,
  getPsPacketByPsId,
  getPsPacketByPsIdWithPagination,
  createPsHeartbeat,
  getPsHeartbeatByPsId,
  performHeartbeatCheck,
  createPsBlockedList,
  getPsBlockedList,
  updatePsBlockedList,
  deletePsBlockedList,
};
