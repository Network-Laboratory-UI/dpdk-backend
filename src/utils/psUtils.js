const modifyPsDates = (pss) => {
  return pss.map(ps => ({
    id: ps.id,
    name: ps.name,
    location: ps.location,
    status: ps.status,
    createdAt: ps.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    updatedAt: ps.updatedAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')
  }));
};

module.exports = {
  modifyPsDates,
};
