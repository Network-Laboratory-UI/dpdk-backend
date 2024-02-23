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

function convertToIndonesiaTime(date) {
  // Get the current time zone offset in minutes
  const timeZoneOffset = date.getTimezoneOffset();

  // Calculate the offset in milliseconds (UTC+7 = -7 hours)
  const indonesiaTimeOffset = -7 * 60 * 60 * 1000;

  // Apply the offset to the input date
  const indonesiaTime = new Date(date.getTime() + indonesiaTimeOffset);

  return indonesiaTime;
}

function checkHeartbeat(heartbeats) {
  const now = new Date();
  const timeThreshold = new Date(now.getTime() - 15000); // Threshold is 60 seconds ago
  console.log("Time Threshold:", timeThreshold);
  
  const recentHeartbeats = heartbeats
    .filter((heartbeat) => new Date(heartbeat.time) > timeThreshold);
  console.log("Recent Heartbeats:", recentHeartbeats);

  const rowCount = recentHeartbeats.length; // Count the number of rows
  console.log("Row Count:", rowCount);

  if (rowCount === 0) {
    // No recent heartbeats in 15 seconds, return false
    return false;
  }
  // If we reached this point, it means the heartbeats are within the threshold
  return true;
}

module.exports = {
  modifyPsDates,
  convertToIndonesiaTime,
  checkHeartbeat,
};
