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

function convertToIndonesiaTime(date) {
  // Get the current time zone offset in minutes
  const timeZoneOffset = date.getTimezoneOffset();

  // Calculate the offset in milliseconds (UTC+7 = -7 hours)
  const indonesiaTimeOffset = -7 * 60 * 60 * 1000;

  // Apply the offset to the input date
  const indonesiaTime = new Date(date.getTime() + indonesiaTimeOffset);

  return indonesiaTime;
}


module.exports = {
  modifyNpbDates,
  convertToIndonesiaTime,
};
