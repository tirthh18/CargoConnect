// const Parcel = require('../models/Parcel');
// const User = require('../models/User');

// // Mock optimization using nearest neighbor or placeholder logic
// const optimizeRoute = (locations) => {
//   // Sort based on coordinates or some logic (real-world: use Google OR Tools / Graph algorithms)
//   return locations.sort((a, b) => a.pincode.localeCompare(b.pincode));
// };

// exports.getOptimizedAgentRoute = async (req, res) => {
//   const { agentId } = req.params;

//   try {
//     const agent = await User.findById(agentId);
//     if (!agent || agent.role !== 'agent') {
//       return res.status(404).json({ error: 'Agent not found' });
//     }

//     const parcels = await Parcel.find({ assignedTo: agentId, status: { $ne: 'delivered' } });

//     const pickupLocations = parcels.map(parcel => ({
//       address: parcel.pickupAddress,
//       pincode: parcel.pickupPincode,
//       trackingNumber: parcel.trackingNumber,
//       weight: parcel.packageSize || "medium", // fallback
//     }));

//     const optimizedLocations = optimizeRoute(pickupLocations);

//     res.json({
//       agentId,
//       pickupLocations: optimizedLocations
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch route' });
//   }
// };
