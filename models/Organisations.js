const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// const geocoder = require("../utils/geocoder");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const organisationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  website:{
      type:String,
      ref:"User"
  },
  description:{
      type: String,
     required: true
  },
  contact:{
    type: Number,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Organisation", organisationSchema);
