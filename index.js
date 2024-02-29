const app = require("./src/app")
const producer = require("./src/config/kafkaConfig");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT signal.");

  // Perform cleanup operations or graceful shutdown here
  // For example, closing database connections, closing files, etc.

  // Then exit the process
  producer.disconnect();
  process.exit(0);
});

