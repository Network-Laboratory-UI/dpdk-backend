const modifyNpbDates = (npbs) => {
  return npbs.map(npb => ({
    id: npb.id,
    name: npb.name,
    location: npb.location,
    status: npb.status,
    createdAt: npb.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: npb.updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')
  }));
};

module.exports = {
  modifyNpbDates,
};
