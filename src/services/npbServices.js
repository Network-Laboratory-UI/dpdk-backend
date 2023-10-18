const Npb = require("../models/npb");
const npbUtils = require("../utils/npbUtils");
const NpbPacket = require("../models/npbPacket");


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
    rx_count,
    tx_count,
    rx_size,
    tx_size,
    time,
    throughput
}) {
  return await NpbPacket.create({
    npb_id,
    http_count,
    https_count,
    rx_count,
    tx_count,
    rx_size,
    tx_size,
    time,
    throughput
  });
}

async function getNpbPacketById(npbId) {
  try {
    const npbPackets = await NpbPacket.findAll({
      where: {
        npb_id: npbId
      }
    });
    return npbPackets;
  } catch (error) {
    throw new Error('Error finding npb_packet by npb ID');
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
};
