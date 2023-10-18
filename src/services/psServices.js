const Ps = require("../models/ps");
const psUtils = require("../utils/psUtils");
const PsPacket = require("../models/psPacket");

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
}) {
  return await PsPacket.create({
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

module.exports = {
  getAllModifiedPSs,
  getPSById,
  createPS,
  getPSByStatus, // New function to get PS by status
  getPSByLocation, // New function to get PS by location
  createPsPacket,
  getPsPacketById,
};

