var express = require('express');
var router = express.Router();

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const requireLogin = require('../utility/requireLogin.js')

// var mongoose = require('mongoose');
// var db = require('../utility/db.js');
// var User = require("../models/user");
var Store = require("../../models/Store");
// const toilet = require('../models/toilet');
//var ObjectId = require('mongoose').Types.ObjectId


router.post('/addStore', (req, res) => {
  const {storeName,lng, lat, contact, restroomPrice, hasSanitaryNapkins, hasTampons, hasMenstrualCups} = req.body;

  if( !lng ||!lat || !contact || !restroomPrice || hasSanitaryNapkins===null || hasTampons===null || hasMenstrualCups===null ){
    return res.status(422).json({error:"Null fields are not allowed"})
  }
  const store = new Store({
    storeName,
    lat,
    lng,
    location: {
      type:"Point",
      coordinates:[lng, lat]
    },
    contact,
    restroomPrice,
    hasSanitaryNapkins, 
    hasTampons,
    hasMenstrualCups

  })
  store.save()
    .then(() => {
      res.json({message:"Saved successfully"})
    })
    .catch((error) => {
      console.log(error);
    });

});

router.get("/nearbyStores", (req, res) => {
  const {maxDistance, lng, lat} = req.query;
  if(!lng||!lat){
    res.status(422).json({ error: "Both lat and lng need to be present!" });
  }
  console.log(req.query)
      Toilet.find({
        location: {
         $nearSphere: {
          $maxDistance: Number(maxDistance)||(10000), //meters
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)]
          }
         }
        }
      },'_id lat lng')
      .find((error, result) => {
        if(error) 
          console.log(error);
        //console.log("nearby toilets called, "+(result)?result.length:"0"+" Toilets found nearby.")
        res.json(result);
       });
});

router.get("/ownerStores", async (req, res) => {
  try{
    const storeArray = await Store.find({
      'owner': (ObjectId)(req.user._id) 
    }).populate("owner");
    res.json(toiletArray);
    console.log("owner toilets called, "+req.user._id)
}
catch (error){
    res.status(422).send(error);
}
})

router.get("/allStores", async (req, res) => {
    try{
        const storesArray = await Store.find({});
        res.json(storesArray);
      
    }
    catch (error){
        res.status(422).send(error);
    }
});


router.post("/newStoreRating",  async (req, res) => {
  const {toilet_id, rating} = req.body;
  console.log(req.body)
  Toilet.findOne({ _id: toilet_id }, function(err, toilet) {
    // if(toilet.usersWhoRated.includes(req.user._id)){
      //   return res.status(422).json({error:"You have already voted!"})
      
      // }
      if(toilet.avgRating===-1){
        toilet.avgRating===0;
      }
      toilet.avgRating=(toilet.avgRating*toilet.usersWhoRated.length+rating)/(toilet.usersWhoRated.length+1);
      toilet.usersWhoRated.push(req.user._id); //This is from requireLogin(uses the bearer code there)
      toilet.save()
      .then((data) => {
        console.log(data)
        res.json(data)
    })
    .catch((error) => {
      console.log(error);
    });
  });
});


router.post("/oneStore",  async (req, res)=>{
  const { store_id } = req.body; 
  try
  {
    const theStore = await Store.findOne({_id: store_id});
    if (theStore)
    {
      res.json(theStore)
    }
    else
    {
      res.status(422).json({error:"No such toilet exists"})
    }
  }
  catch (e) 
  {
    console.log(e)
    res.status(422).json({error:"Error"})
  }
  
})

module.exports = router;


// router.post("/changeAvailability", requireLogin, async (req, res) => {
//     const {toilet_id} = req.body;
//     console.log("change avail re")
//     Toilet.findOne({ _id: toilet_id }, function(err, toilet) {
//       if(!toilet){
//         console.log(toilet);
//         return res.status(422).json({error:"This toilet doesn't exist."})
//    }
//       console.log({toilet})
//       if(String(toilet.owner)!==String(req.user._id)){
//            return res.status(422).json({error:"You do not own this toilet! toilet owner- " +toilet.owner+" and you - "+req.user._id})
      
//       }
      
//       toilet.isAvailable = !toilet.isAvailable;
//       toilet.save()
//       .then(() => {
//         res.json({message:"Changed availability successfully"})
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// });