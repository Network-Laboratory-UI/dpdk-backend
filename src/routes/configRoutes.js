const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");

// Route for creating config
router.post("/create", configController.createConfig);
router.get("/:id", configController.getConfigById);

module.exports = router;

