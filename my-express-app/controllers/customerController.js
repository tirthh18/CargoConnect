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
    
    // Simulate saving to DB
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

    // TODO: Replace this with DB call like: await Order.create(order);
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

// exports.getCustomerParcels = async (req, res) => {
//   const { customerId } = req.params;

//   const parcels = await Parcel.find({ customerId });

//   const totalOrders = parcels.length;
//   const currentOrders = parcels.filter(p => p.status !== 'Delivered' && p.status !== 'Cancelled').length;
//   const cancelledOrders = parcels.filter(p => p.status === 'Cancelled').length;
//   const totalSpent = parcels.reduce((sum, p) => sum + (p.price || 0), 0);

//   res.json({
//     totalOrders,
//     currentOrders,
//     cancelledOrders,
//     totalSpent,
//     parcels
//   });
// };