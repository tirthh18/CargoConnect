const Parcel = require('../models/Parcel');
const validateAddress = require('../utils/validateAddress');
const User = require('../models/User');
const axios = require('axios')

const generateTrackingNumber = () => {
  return 'TRK' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};

exports.createParcel = async (req, res) => {
  try {
    const {
      priority,
      senderName,
      pickupAddress,
      pickupCity,
      pickupPincode,
      senderMobile,
      receiverName,
      dropAddress,
      dropCity,
      dropPincode,
      receiverMobile,
      deliveryType,
      weight,
      selectedDate,
      selectedTime,
      paymentMethod,
      upiId
    } = req.body;
    
    let baseCost = 0;
    if (deliveryType === "local") baseCost = 100;
    else if (deliveryType === "intercity") baseCost = 180;
    
    if (weight === "1kg") baseCost += 10;
    else if (weight === "5kg") baseCost += 25;
    else if (weight === "10kg") baseCost += 40;
    else if (weight === "15kg") baseCost += 60;
    
    const gst = baseCost * 0.18;
    const insurance = 15;
    const totalCost = baseCost + gst + insurance;
    
    const pickupCoordinates = await getCoordinates(pickupAddress, pickupCity);
    const dropCoordinates = await getCoordinates(dropAddress, dropCity);
    
    const newParcel = new Parcel({
      trackingNumber: generateTrackingNumber(),
      user: req.user.id,
      status: 'pending',
      senderDetails: {
        senderName,
        senderEmail: req.user.email,
        senderMobile,
        pickupAddress,
        pickupCity,
        pickupPincode,
        coordinates: pickupCoordinates 
      },
      receiverDetails: {
        receiverName,
        receiverMobile,
        dropAddress,
        dropCity,
        dropPincode,
        coordinates: dropCoordinates 
      },
      parcelDetails: {
        priority,
        deliveryType,
        weight,
        scheduleDate: selectedDate,
        scheduleTime: selectedTime,
        paymentMethod,
        upiId: paymentMethod === 'upi' ? upiId : null,
        totalCost: totalCost,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'processing',
      },
      currentLocation: {
        coordinates: pickupCoordinates, 
        updatedAt: Date.now()
      },
      timeline: [
        {
          status: 'order_placed',
          timestamp: Date.now(),
          description: 'Order has been placed successfully',
          coordinates: pickupCoordinates 
        },
      ],
    });
    
    await newParcel.save();
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      trackingNumber: newParcel.trackingNumber,
      parcel: newParcel
    });
    console.log(newParcel);
    console.log(parcel);


  } catch (error) {
    console.error('Error creating parcel:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create parcel order',
      error: error.message
    });
  }
};


async function getCoordinates(address, city) {
  try {
    const fullAddress = `${address}, ${city}, India`;

    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: fullAddress,
        key: process.env.OPENCAGE_API_KEY,  
        limit: 1,
        countrycode: 'in',  
      }
    });

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry;
      return {
        lat: location.lat,
        lng: location.lng
      };
    }

    return { lat: 0, lng: 0 };
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    return { lat: 0, lng: 0 };
  }
}


exports.getUserParcels = async (req, res) => {
  try {
    const customerId = req.user.id;
    const parcels = await Parcel.find({ user: customerId });

    const totalOrders = parcels.length;
    const currentOrders = parcels.filter(
      (p) =>
        p.status !== "delivered" &&
        p.status !== "cancelled"    ).length;
    const cancelledOrders = parcels.filter((p) => p.status === "cancelled").length;
    
    
    const totalSpent = parcels
      .filter(p => p.status !== "cancelled")
      .reduce((sum, p) => sum + (p.parcelDetails?.totalCost || 0), 0);
  
    const deliveredOrders = parcels.filter(p => p.status === 'delivered').length;

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString('default', { month: 'short' }),
      orders: 0,
    }));
    
    parcels.forEach(p => {
      const month = new Date(p.createdAt).getMonth();
      monthlyData[month].orders += 1;
    });
    

    res.json({
      totalOrders,
      currentOrders,
      cancelledOrders,
      deliveredOrders,
      totalSpent,
      monthlyData, 
      parcels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.cancelparcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    if (parcel.status === "delivered") {
      return res.status(400).json({ message: "Cannot cancel a delivered parcel" });
    }

    parcel.status = "cancelled";
    await parcel.save();

    res.status(200).json({ message: "Parcel cancelled", parcel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllParcels = async (req, res) => {
  try {
    const adminCity = req.user.city;

    const parcels = await Parcel.find({
      'senderDetails.pickupCity': adminCity,
      status: { $ne: 'cancelled' },
    }).sort({ createdAt: -1 });

    const totalOrders = parcels.length;
    const currentOrders = parcels.filter(p =>
      ['pending', 'out_for_delivery'].includes(p.status)
    ).length;
    const deliveredOrders = parcels.filter(p => p.status === 'delivered').length;

    res.json({
      totalOrders,
      currentOrders,
      deliveredOrders,
      parcels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch parcels' });
  }
};


exports.updateParcelStatus = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    const { status } = req.body;
    parcel.status = status;
    await parcel.save();

    res.json({ message: "Status updated", parcel });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.trackParcel = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    
    const parcel = await Parcel.findOne({ trackingNumber });
    
    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel not found with this tracking number'
      });
    }
    
    res.status(200).json({
      success: true,
      parcel
    });
  } catch (error) {
    console.error('Error tracking parcel:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track parcel',
      error: error.message
    });
  }
};

exports.assignParcelToAgent = async (req, res) => {
  try {
    const { parcelId, agentName } = req.body;

    console.log("Request body:", req.body);

    if (!parcelId || !agentName) {
      return res.status(400).json({ message: "Parcel ID and agent name are required." });
    }

    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    parcel.assignedDeliveryAgent = agentName;
    parcel.status = "out_for_delivery";
    await parcel.save();

    res.status(200).json({ message: "Parcel assigned successfully", parcel });
  } catch (err) {
    console.error(" Error in assignParcelToAgent:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


