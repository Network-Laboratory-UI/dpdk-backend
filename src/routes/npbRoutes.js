const express = require("express");
const router = express.Router();
const npbController = require("../controllers/npbController");
const { route } = require("./psRoutes");

router.get("/npbs", npbController.getAllNpbs);
router.post("/createnpb", npbController.createNpb);
router.get("/npbid/:id", npbController.getNpbById);

// Use POST and send location in the body
router.post("/status", npbController.getNpbByStatus);

// Use POST and send status in the body
router.post("/location", npbController.getNpbByLocation);

// Route to create an NpbPacket
router.post("/npb-packet", npbController.createNpbPacket);
router.get('/npb-packet-total/:id', npbController.geTotalNpbPacketByNpbId);
router.get(
  "/npb-packet-page/:id",
  npbController.getNpbPacketByNpbIdWithPagination
);
router.get("/npb-packet/:id", npbController.getNpbPacketByNpbId);


// Route for Hearbeat
router.post("/heartbeat", npbController.createNpbHeartbeat);
router.get('/heartbeat/:id', npbController.getNpbHeartbeatByNpbId);


module.exports = router;
