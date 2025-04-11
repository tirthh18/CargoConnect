// const Agent = require('../models/Agent');
const Parcel = require('../models/Parcel');
const User = require('../models/User');

exports.getAgentRoutes = async (req, res) => {
  const { id } = req.params;
  const parcels = await Parcel.find({ assignedAgent: id, status: { $ne: 'Delivered' } });

  const pickupLocations = parcels.map(parcel => ({
    address: parcel.receiver.address,
    pincode: parcel.receiver.pincode,
    trackingNumber: parcel.trackingNumber,
    weight: parcel.weight || "medium"
  }));

  res.json({ pickupLocations });
};



