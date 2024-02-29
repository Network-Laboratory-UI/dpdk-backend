const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
  clientId: "dpdk-dahsboard-backend",
  brokers: ["192.168.0.90:9092"],
});

// user.on("ready", () => {
//   console.log("Kafka Connected");
// });

// user.on("error", (error) => {
//   console.error("Error connecting to Kafka:", error);
// });

const producer = kafkaClient.producer();

async function init() {
  await producer.connect();
  console.log("Producer Connected Successfully");
}

init();

module.exports = producer;
