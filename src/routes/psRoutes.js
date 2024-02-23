const express = require("express");
const router = express.Router();
const psController = require("../controllers/psController.js")

// Routes for npbs
router.get("/pss", psController.getAllPSs);
router.post("/createps", psController.createPSs);
router.get("/psid/:id", psController.getPSById);

// Endpoint to get PS instances by status
router.post("/status", psController.getPSByStatus);

// Endpoint to get PS instances by location
router.post("/location", psController.getPSByLocation);

router.post("/ps-packet", psController.createPsPacket);
router.get('/ps-packet/:id', psController.getPsPacketByPsId);

// Route for Hearbeat
router.post("/heartbeat", psController.createPsHeartbeat);
router.get('/heartbeat/:id', psController.getPsHeartbeatByPsId);

module.exports = router;
