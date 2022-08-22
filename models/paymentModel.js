const mongoose = require("mongoose");

const paymentModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    phone: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payments", paymentModel);
