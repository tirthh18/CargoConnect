const Parcel = require('../models/Parcel');

exports.placeOrder = async (req, res) => {
  try {
    const {
      priority,
      sender,
      receiver,
      deliveryType,
      weight,
      scheduleDate,
      scheduleTime,
      paymentMethod,
      upiId,
    } = req.body;

    const trackingNumber = `TRK${Math.floor(100000 + Math.random() * 900000)}`;
    
    const order = {
      userId: req.user.id,
      trackingNumber,
      priority,
      sender,
      receiver,
      deliveryType,
      weight,
      scheduleDate,
      scheduleTime,
      paymentMethod,
      upiId,
      status: "pending",
    };

    console.log("Order placed:", order);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      trackingNumber,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

