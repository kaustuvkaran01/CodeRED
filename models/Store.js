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

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  //latitude and longitude
  lat:{
      type: Number,
      required: true
  },
  lng:{
      type: Number,
      required: true
  }, 
  //geojson object, needs type:'Point' and stuff.
  location: {
      type: pointSchema,
      index:'2dsphere'
  },
  owner:{
      type:String,
      ref:"User"
  },
  averagePrice:{
      type: Number,
      // required: true
  },
  hasSanitaryNapkins:{
    type: Boolean,
    default: false
  },
  hasTampons:{
    type: Boolean,
    default: false
  },
  hasMenstrualCups:{
    type: Boolean,
    default: false
  },
  photos:{
      type: [String]
      //by default it's an empty array.
  },
  avgRating:{
      type:Number,
      default: -1
  },
  usersWhoRated:{
      type: [ObjectId],
      ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// const StoreSchema = new mongoose.Schema({
//   loc: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       required: true,
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//       index:'2dsphere'
//     },
//     formattedAddres: String
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

//Geocode & create location

// StoreSchema.pre("save", async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   this.location = {
//     type: "Point",
//     coordinates: [loc[0].latitude, loc[0].longitude],
//     formattedAddress: loc[0].formatAddress,
//   };
//   Do not save address
//   this.address = undefined;
//   next();
// });

module.exports = mongoose.model("Store", storeSchema);
