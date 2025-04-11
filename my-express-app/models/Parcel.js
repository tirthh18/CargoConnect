// const mongoose = require("mongoose");

// const ParcelSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   trackingNumber: { type: String, unique: true },
//   status: { type: String, enum: ["Pending", "Out for Delivery", "Delivered"], default: "Pending" },
//   priority: String,
//   sender: {
//     name: String,
//     address: String,
//     pincode: String,
//     mobile: String,
//   },
//   receiver: {
//     name: String,
//     address: String,
//     city: String,
//     pincode: String,
//     mobile: String,
//   },
//   deliveryType: String,
//   weight: String,
//   scheduledDate: String,
//   scheduledTime: String,
//   payment: {
//     method: { type: String, enum: ["cod", "upi"] },
//     upiId: { type: String, default: null },
//     insurance: { type: Boolean, default: false },
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Parcel", ParcelSchema);
// src/models/Parcel.js

const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema(
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
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },

    // Sender details
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
    },

    // Receiver details
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
    },

    // Order details
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
        enum: ["1kg", "5kg", "10kg", "15kg"],
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

      // Payment details
      paymentMethod: {
        type: String,
        enum: ["cod", "upi"],
        required: true,
      },
      upiId: {
        type: String,
        default: null,
      },
      totalCost: {
        type: Number,
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "processing", "completed", "failed", "refunded"],
        default: "pending",
      },
    },

    // timeline: [
    //   {
    //     status: {
    //       type: String,
    //       required: true,
    //     },
    //     timestamp: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //     description: {
    //       type: String,
    //       required: true,
    //     },
    //     location: {
    //       type: String,
    //       default: null,
    //     },
    //   },
    // ],

    assignedDeliveryAgent: {
      type: String, 
      default: null
    }     
  },
  {
    timestamps: true,
  }
);

ParcelSchema.index({ user: 1 });
ParcelSchema.index({ status: 1 });

const Parcel = mongoose.model("Parcel", ParcelSchema);

module.exports = Parcel;
