var express = require('express');
var router = express.Router();
//var Organisation = require("../../models/Organisations");
const Query = require('../../models/Queries');



router.post('/newQuery',  (req, res) => {
  const {lng, lat, Title, ownerEmail, Description, createdAt,isAccepted,isCounsellorRequired,isSingleParent,isUnder18} = req.body;

  if(!lng ||!lat || !Title ||!ownerEmail || !Description || isAccepted==null || isCounsellorRequired==null ||isSingleParent == null || isUnder18==null){
    return res.status(422).json({error:"Null fields are not allowed"})
  }
  const query = new Query({
    lat,
    lng,
    location: {
      type:"Point",
      coordinates:[lng, lat]
    },
  Title,
  ownerEmail,
  Description,
  isAccepted,
  isCounsellorRequired,
  isSingleParent,

  })
  query.save()
    .then(() => {
      res.json({message:"Saved successfully!"})
    })
    .catch((error) => {
      console.log(error);
    });

});


router.get("/allQueries", async (req, res) => {
    try{
        const queryArray = await Query.find({});
        res.json(queryArray);
      
    }
    catch (error){
        res.status(422).send(error);
    }
});
    

router.post("/acceptQuery", async (req,res) => {
  try{
    Query.update({_id:ObjectId(req.id)}, {$set: {"isAccepted":"true","isCounsellorRequired":"true"}})
  } catch(err){
    console.error(err);
  }
  
});


module.exports = router;