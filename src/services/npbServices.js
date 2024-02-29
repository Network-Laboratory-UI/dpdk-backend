const Npb = require("../models/npb");
const npbUtils = require("../utils/npbUtils");
const NpbPacket = require("../models/npbPacket");
const Config = require("../models/configData");
const NpbHeartbeat = require("../models/npbHeartbeat");

async function getAllModifiedNpbs() {
  const npbs = await Npb.findAll();
  return npbUtils.modifyNpbDates(npbs);
}

async function getNpbById(npbId) {
  return await Npb.findByPk(npbId);
}

async function createNpb(name, location) {
  return await Npb.create({ name, location });
}

async function getNpbByStatus(status) {
  return await Npb.findAll({ where: { status } });
}

async function getNpbByLocation(location) {
  return await Npb.findAll({ where: { location } });
}

async function createNpbPacket({
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
}) {
  try {
    return await NpbPacket.create({
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
  } catch (error) {
    throw new Error("Error creating npb_packet");
  }
}

async function getNpbPacketById(npbId) {
  try {
    const npbPackets = await NpbPacket.findAll({
      where: {
        npb_id: npbId,
      },
    });
    return npbPackets;
  } catch (error) {
    throw new Error("Error finding npb_packet by npb ID");
  }
}

// Updated service function to handle pagination
async function getNpbPacketByIdWithPagination(npbId, page, pageSize) {
  try {
    const offset = (page - 1) * pageSize; // Calculate offset based on page number and pageSize
    const npbPackets = await NpbPacket.findAll({
      where: {
        npb_id: npbId,
      },
      offset, // Apply offset
      limit: pageSize, // Apply limit
    });
    return npbPackets;
  } catch (error) {
    throw new Error("Error finding npb_packet by npb ID");
  }
}

async function createConfig(
  Id,
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
) {
  try {
    const config = await Config.create({
      Id,
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
    });
    return config;
  } catch (error) {
    throw new Error("Error creating config");
  }
}

async function getConfigById(Id) {
  try {
    const config = await Config.findOne({
      where: {
        Id,
      },
    });
    return config;
  } catch (error) {
    throw new Error("Error finding config by ID");
  }
}

async function createHeartbeat(npb_id, time) {
  try {
    console.log(npb_id, time);
    const heartbeat = await NpbHeartbeat.create({
      npb_id,
      time,
    });
    return heartbeat;
  } catch (error) {
    throw new Error("Error creating heartbeat");
  }
}

async function getAllHeartbeatbyNpbId(npb_id) {
  try {
    const heartbeat = await NpbHeartbeat.findAll({
      where: {
        npb_id,
      },
    });
    return heartbeat;
  } catch (error) {
    throw new Error("Error finding heartbeat by npb ID");
  }
}

async function getNpbHeartbeatByNpbId(npb_id) {
  try {
    // Retrieve all heartbeat records for the specified npb_id
    const heartbeats = await NpbHeartbeat.findAll({
      where: {
        npb_id,
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
    const isAlive = npbUtils.checkHeartbeat(heartbeatDataValues);
    return isAlive;
  } catch (error) {
    throw new Error("Error finding heartbeat by npb ID");
  }
}

async function updateNpbStatus(npbId, status) {
  try {
    const npb = await Npb.findByPk(npbId);
    if (!npb) {
      return null;
    }
    npb.status = status;
    npb.updatedAt = new Date(); // Update the updatedAt field
    await npb.save();
    return npb;
  } catch (error) {
    throw new Error("Error updating npb status");
  }
}

module.exports = {
  getAllModifiedNpbs,
  getNpbById,
  createNpb,
  getNpbByStatus,
  getNpbByLocation,
  createNpbPacket,
  getNpbPacketById,
  getNpbPacketByIdWithPagination,
  createConfig,
  getConfigById,
  createHeartbeat,
  getNpbHeartbeatByNpbId,
  getAllHeartbeatbyNpbId,
  updateNpbStatus,
};
