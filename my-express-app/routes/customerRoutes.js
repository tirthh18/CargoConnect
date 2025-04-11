const express = require("express");
const { placeOrder } = require("../controllers/customerController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/customer/place-order
router.post("/place-order", authenticate, placeOrder);
// router.get('/:customerId/parcels', getCustomerParcels);

module.exports = router;
