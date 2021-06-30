const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  productNo: {
    type: Number,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
