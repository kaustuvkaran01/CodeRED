var express = require('express');
var router = express.Router();
//var Organisation = require("../../models/Organisations");
const Organisation = require('../../models/Organisations');



router.post('/newOrg',  (req, res) => {
  const {Name, ownerEmail, website, description, contact} = req.body;

  if( !Name ||!ownerEmail || !website || !description || !contact){
    return res.status(422).json({error:"Null fields are not allowed"})
  }
  const organisation = new Organisation({
  Name,
  ownerEmail,
  website,
  description,
  contact
  })
  organisation.save()
    .then(() => {
      res.json({message:"Saved successfully!"})
    })
    .catch((error) => {
      console.log(error);
    });

});


router.get("/allOrgs", async (req, res) => {
    try{
        const orgArray = await Organisation.find({});
        res.json(orgArray);
      
    }
    catch (error){
        res.status(422).send(error);
    }
});
    

module.exports = router;

