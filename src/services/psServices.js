const Ps = require("../models/ps");
const psUtils = require("../utils/psUtils");
const PsPacket = require("../models/psPacket");
const PsHeartbeat = require("../models/psHeartbeat");

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
  return await Ps.create({ name, location});
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
    rst_client,
    rst_server,
    rx_count,
    tx_count,
    rx_size,
    tx_size,
    time,
    throughput,
}) {
  return await PsPacket.create({
    ps_id,
    rst_client,
    rst_server,
    rx_count,
    tx_count,
    rx_size,
    tx_size,
    time,
    throughput,
  });
}

async function getPsPacketById(psId) {
  try {
    const psPackets = await PsPacket.findAll({
      where: {
        ps_id: psId
      }
    });
    return psPackets;
  } catch (error) {
    throw new Error('Error finding ps_packet by ps ID');
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

module.exports = {
  getAllModifiedPSs,
  getPSById,
  createPS,
  getPSByStatus,
  getPSByLocation,
  createPsPacket,
  getPsPacketById,
  createHeartbeat,
  getAllHeartbeatbyPsId,
  getPsHeartbeatByPsId,
  updatePsStatus,
};

