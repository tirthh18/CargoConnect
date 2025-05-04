const express = require("express");
const { placeOrder } = require("../controllers/customerController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/place-order", authenticate, placeOrder);

module.exports = router;
