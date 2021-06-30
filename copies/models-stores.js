const mongoose = require("mongoose");
// const geocoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  loc: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index:'2dsphere'
    },
    formattedAddres: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Geocode & create location

StoreSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formatAddress,
  };
  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", StoreSchema);
