const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

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
  

const querySchema = new mongoose.Schema({
    id:{
      type: ObjectId,
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
    Title:{
      type: String, 
      required: true,
    }, 
    Description:{
        type: String, 
        required: true,
      }, 
      isSingleParent:{
        type: Boolean,
        default: false
      },
      isUnder18:{
        type: Boolean,
        default: false
      },
      isCounsellorRequired:{
        type: Boolean,
        default: false
      },
      ownerEmail: {
        type: String,
      },
      orgEmail:{
        type:String,
      },
    isAccepted:{
        type: Boolean,
        default: false
    },
    meetingId:{
      type:String,
      default:""
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
});

module.exports = mongoose.model("Query", querySchema);