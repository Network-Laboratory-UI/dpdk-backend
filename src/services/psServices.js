const Ps = require("../models/ps");
const psUtils = require("../utils/psUtils");
const PsPacket = require("../models/psPacket");
const PsHeartbeat = require("../models/psHeartbeat");
const PsBlockedList = require("../models/psBlockedList");

const getAllModifiedPSs = async () => {
  const psInstances = await Ps.findAll();
  return psUtils.modifyPsDates(psInstances);
};

const getPSById = async (psId) => {
  const psInstance = await Ps.findByPk(psId);

  if (!psInstance) {
    return null; // Or return a message indicating that the PS instance was not found
  }

  return psUtils.modifyPsDates([psInstance])[0]; // Since modifyPsDates expects an array
};

const createPS = async (name, location) => {
  return await Ps.create({ name, location });
};

async function getPSByStatus(status) {
  const psInstances = await Ps.findAll({ where: { status } });
  return psUtils.modifyPsDates(psInstances);
}

async function getPSByLocation(location) {
  const psInstances = await Ps.findAll({ where: { location } });
  return psUtils.modifyPsDates(psInstances);
}

async function createPsPacket({
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
}) {
  try {
    return await PsPacket.create({
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
  } catch (error) {
    throw new Error("Error creating ps_packet");
  }
}

async function getTotalPsPacketById(psId) {
  try {
    const [totalRstClient, totalRstServer, totalTxCount, totalRxCount] = await Promise.all([
      PsPacket.sum('rstClient', { where: { ps_id: psId } }),
      PsPacket.sum('rstServer', { where: { ps_id: psId } }),
      PsPacket.sum('tx_1_count', { where: { ps_id: psId } }),
      PsPacket.sum('rx_0_count', { where: { ps_id: psId } }),
    ]);

    // Return the totals
    return {
      psPackets: {
        rstClient: totalRstClient || 0,
        rstServer: totalRstServer || 0,
        tx_1_count: totalTxCount || 0,
        rx_0_count: totalRxCount || 0,
      },
    };
  } catch (error) {
    throw new Error("Error finding ps_packet by ps ID");
  }
}
async function getPsPacketById(psId) {
  try {
    const psPackets = await PsPacket.findAll({
      where: {
        ps_id: psId,
      },
    });
    return psPackets;
  } catch (error) {
    throw new Error("Error finding ps_packet by ps ID");
  }
}

// Updated service function to handle pagination
async function getPsPacketByIdWithPagination(psId, page, pageSize) {
  try {
    const offset = (page - 1) * pageSize; // Calculate offset based on page number and pageSize
    const psPackets = await PsPacket.findAll({
      where: {
        ps_id: psId,
      },
      order: [["time", "DESC"]],
      offset,
      limit: pageSize,
    });
    return psPackets;
  } catch (error) {
    throw new Error("Error finding ps_packet by ps ID");
  }
}

async function getTotalCountPacketById(psId) {
  try {
    const psPackets = await PsPacket.count({
      where: {
        ps_id: psId,
      },
    });

    return psPackets;
  } catch (error) {
    throw new Error("Error finding npb_packet by ps ID");
  }
}

async function createHeartbeat(ps_id, time) {
  try {
    console.log(ps_id, time);
    const heartbeat = await PsHeartbeat.create({
      ps_id,
      time,
    });
    return heartbeat;
  } catch (error) {
    throw new Error("Error creating heartbeat");
  }
}

async function getAllHeartbeatbyPsId(ps_id) {
  try {
    const heartbeat = await PsHeartbeat.findAll({
      where: {
        ps_id,
      },
    });
    return heartbeat;
  } catch (error) {
    throw new Error("Error finding heartbeat by ps ID");
  }
}

async function getPsHeartbeatByPsId(ps_id) {
  try {
    // Retrieve all heartbeat records for the specified ps_id
    const heartbeats = await PsHeartbeat.findAll({
      where: {
        ps_id,
      },
    });

    // Check if any heartbeat records exist
    if (heartbeats.length === 0) {
      // No heartbeat records found, return false
      return false;
    }

    // Extract dataValues from each heartbeat
    const heartbeatDataValues = heartbeats.map(
      (heartbeat) => heartbeat.dataValues
    );

    // Check if any alive heartbeats found
    const isAlive = psUtils.checkHeartbeat(heartbeatDataValues);
    return isAlive;
  } catch (error) {
    throw new Error("Error finding heartbeat by ps ID");
  }
}

async function updatePsStatus(psId, status) {
  try {
    const ps = await Ps.findByPk(psId);
    if (!ps) {
      return null;
    }
    ps.status = status;
    ps.updatedAt = new Date(); // Update the updatedAt field
    await ps.save();
    return ps;
  } catch (error) {
    throw new Error("Error updating ps status");
  }
}

// Service function to create a PS blocked list
async function createPsBlockedList(name, domain, ip_add) {
  try {
    // Create the PS blocked list record
    const createdBlockedList = await PsBlockedList.create({
      name,
      domain,
      ip_add,
    });
    return createdBlockedList; // Return the created blocked list object
  } catch (error) {
    throw new Error("Failed to create PS blocked list");
  }
}

async function getAllPsBlockedList() {
  try {
    // Retrieve all blocked list records
    const blockedList = await PsBlockedList.findAll(
      {
        order: [
          ["id", "ASC"],
        ],
      }
    );

    // Check if any blocked list records exist
    if (blockedList.length === 0) {
      // No blocked list records found, return false
      return blockedList;
    }

    return blockedList;
  } catch (error) {
    throw new Error("Error finding all blocked list");
  }
}

async function deletePsBlockedList(id) {
  try {
    // Find the blocked list record by id
    const blockedList = await PsBlockedList.findByPk(id);
    // Check if the blocked list record exists
    if (!blockedList) {
      return blockedList;
    }
    // Delete the blocked list record
    await blockedList.destroy();
    return blockedList;
  } catch (error) {
    console.error("Error deleting blocked list:", error);
    throw new Error("Error deleting blocked list");
  }
}

async function updatePsBlockedList(id, name, domain, ip_add) {
  try {
    // Find the blocked list record by id
    const blockedList = await PsBlockedList.findByPk(id);
    // Check if the blocked list record exists
    if (!blockedList) {
      return blockedList;
    }
    // Update the blocked list record
    blockedList.name = name;
    blockedList.domain = domain;
    blockedList.ip_add = ip_add;
    await blockedList.save();
    return blockedList;
  } catch (error) {
    console.error("Error updating blocked list:", error);
    throw new Error("Error updating blocked list");
  }
}

async function updateBlockedListHitCount(id, newHitCount) {
  // Fetch all blocked lists from the database
  const blockedLists = await getAllPsBlockedList();

  // Check if the provided id exists in the blocked lists
  const idExists = blockedLists.some((list) => list.id === id);

  // If the id does not exist, throw an error
  if (!idExists) {
    throw new Error(`Blocked list with id ${id} not found`);
  }

  // Find the specific blocked list using the provided id
  const blockedList = blockedLists.find((list) => list.id === id);

  // Get the current hit count
  const currentHitCount = blockedList.hit_count;

  // Parsing integer
  const intCurrentHitCount = parseInt(currentHitCount, 10);
  const intNewHitCount = parseInt(newHitCount, 10);

  // Add the new hit count to the current hit count
  const totalHitCount = intCurrentHitCount + intNewHitCount;

  // Update the blocked list in the database with the new total hit count
  const updatedBlockedList = await PsBlockedList.update(
    { hit_count: totalHitCount },
    { where: { id: id } }
  );

  // Return the updated blocked list
  return updatedBlockedList;
}

module.exports = {
  getAllModifiedPSs,
  getPSById,
  createPS,
  getPSByStatus,
  getPSByLocation,
  createPsPacket,
  getTotalPsPacketById,
  getPsPacketById,
  getPsPacketByIdWithPagination,
  getTotalCountPacketById,
  createHeartbeat,
  getAllHeartbeatbyPsId,
  getPsHeartbeatByPsId,
  updatePsStatus,
  createPsBlockedList,
  getAllPsBlockedList,
  updatePsBlockedList,
  updateBlockedListHitCount,
  deletePsBlockedList,
};
