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
  const timeThreshold = new Date(now.getTime() - 60000); // Threshold is 60 seconds ago
  console.log("Time Threshold:", timeThreshold);

  const recentHeartbeats = heartbeats
    .filter((heartbeat) => new Date(heartbeat.time) > timeThreshold)
    .sort((a, b) => new Date(b.time) - new Date(a.time)); // Sort heartbeats by time in descending order
  console.log("Recent Heartbeats:", recentHeartbeats);

  let consecutiveMisses = 0; // Track consecutive misses
  const lastHeartbeatTime = recentHeartbeats[0]
    ? new Date(recentHeartbeats[0].time)
    : null; // Get the time of the latest heartbeat
  console.log("Last Heartbeat Time:", lastHeartbeatTime);

  if (!lastHeartbeatTime) {
    // No recent heartbeats
    return false;
  }

  // Check the last 60 seconds of data
  for (let i = 0; i < 12; i++) {
    const timeToCheck = new Date(lastHeartbeatTime.getTime() - i * 5000); // Check every 5 seconds
    console.log("Time to Check:", timeToCheck);

    const foundHeartbeat = recentHeartbeats.find((heartbeat) => {
      const heartbeatTime = new Date(heartbeat.time);
      return heartbeatTime.getTime() === timeToCheck.getTime(); // Check if heartbeat time matches the time to check
    });
    console.log("Found Heartbeat:", foundHeartbeat);

    if (!foundHeartbeat) {
      consecutiveMisses++;
      console.log("Consecutive Misses:", consecutiveMisses);
      if (consecutiveMisses > 3) {
        // Consecutive misses exceed the threshold
        return false;
      }
    } else {
      consecutiveMisses = 0; // Reset consecutive misses counter
    }
  }

  // If we reached this point, it means the heartbeats are within the threshold
  return true;
}

module.exports = {
  modifyPsDates,
  convertToIndonesiaTime,
  checkHeartbeat,
};
