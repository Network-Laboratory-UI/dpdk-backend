const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
  clientId: "dpdk-dashboard-backend",
  brokers: ["192.168.0.90:9092"],
});

const producer = kafkaClient.producer();
const consumer = kafkaClient.consumer({ groupId: "logging-dashboard-group" });
const admin = kafkaClient.admin(); // Create admin here

async function init() {
  try {
    await producer.connect();
    console.log("Producer connected successfully");

    await admin.connect();
    console.log("Admin connected successfully");

    // Create topics
    try {
      await admin.createTopics({
        topics: [{ topic: "logging-dashboard", numPartitions: 1 }],
      });
      console.log("Topic 'logging-dashboard' created successfully");
    } catch (error) {
      console.error("Error creating topic: ", error);
    }

    await admin.disconnect();
    console.log("Admin disconnected successfully");

    // Consumer
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({
      topic: "logging-dashboard",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  } catch (error) {
    console.error("Error initializing Kafka setup: ", error);
  }
}

init();

module.exports = { producer, consumer, admin }; // Export admin here