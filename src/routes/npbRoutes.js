const express = require("express");
const router = express.Router();
const npbController = require("../controllers/npbController");

router.get("/npbs", npbController.getAllNpbs);
router.post("/createnpb", npbController.createNpb);
router.get("/npbid/:id", npbController.getNpbById);

// Use POST and send location in the body
router.post("/status", npbController.getNpbByStatus);

// Use POST and send status in the body
router.post("/location", npbController.getNpbByLocation);

// Route to create an NpbPacket
router.post("/npb-packet", npbController.createNpbPacket);
router.get('/npb-packet/:id', npbController.getNpbPacketByNpbId);

// Route for creating config
router.post("/config", npbController.createConfig);
router.get('/config/:id', npbController.getConfigById);


module.exports = router;
