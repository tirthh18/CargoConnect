const mongoose = require("mongoose");

const coordinatesSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const parcelSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    senderDetails: {
      senderName: {
        type: String,
        required: true,
      },
      senderEmail: {
        type: String,
        required: true,
      },
      senderMobile: {
        type: String,
        required: true,
      },
      pickupAddress: {
        type: String,
        required: true,
      },
      pickupCity: {
        type: String,
        required: true,
      },
      pickupPincode: {
        type: String,
        required: true,
      },
      coordinates: coordinatesSchema, // Added coordinates for pickup location
    },
    receiverDetails: {
      receiverName: {
        type: String,
        required: true,
      },
      receiverMobile: {
        type: String,
        required: true,
      },
      dropAddress: {
        type: String,
        required: true,
      },
      dropCity: {
        type: String,
        required: true,
      },
      dropPincode: {
        type: String,
        required: true,
      },
      coordinates: coordinatesSchema, // Added coordinates for drop location
    },
    parcelDetails: {
      priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
      deliveryType: {
        type: String,
        enum: ["local", "intercity"],
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      scheduleDate: {
        type: Date,
        required: true,
      },
      scheduleTime: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["cod", "upi"],
        required: true,
      },
      upiId: {
        type: String,
      },
      totalCost: {
        type: Number,
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "pending",
      },
    },
    currentLocation: {
      coordinates: coordinatesSchema, // Added current tracking location
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    timeline: [
      {
        status: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        description: {
          type: String,
          required: true,
        },
        coordinates: coordinatesSchema, // Added coordinates for each timeline event
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    estimatedDelivery: {
      type: Date,
    },
    assignedDeliveryAgent: {
      type: String,
      default: null,
    },
  },

  { timestamps: true }
);

// Create a 2dsphere index on the currentLocation.coordinates field for geospatial queries
parcelSchema.index({ "currentLocation.coordinates": "2dsphere" });

module.exports = mongoose.model("Parcel", parcelSchema);
