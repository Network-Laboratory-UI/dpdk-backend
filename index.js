const app = require("./src/app")
const { producer, admin } = require("./src/config/kafkaConfig"); // Destructure producer and admin from the exported object

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => { // Make this function async
  console.log("Received SIGINT signal.");

  // Perform cleanup operations or graceful shutdown here
  // For example, closing database connections, closing files, etc.

  // Then exit the process
  await producer.disconnect();

  // Delete topics
  try {
    await admin.deleteTopics({
      topics: [ "logging-dashboard", "dpdk-blocked-list" ], // add other topic names here
    });
    console.log("Topics 'logging-dashboard' and 'dpdk-blocked-list' deleted successfully");
  } catch (error) {
    console.error("Error deleting topics: ", error);
  }

  await admin.disconnect(); // Disconnect admin
  process.exit(0);
});