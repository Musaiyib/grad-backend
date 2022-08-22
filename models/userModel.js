const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    required: true,
    default: "Basic",
  },
  password: {
    type: String,
    required: true,
    minLenght: 8,
  },
});

module.exports = mongoose.model("User", userModel);
