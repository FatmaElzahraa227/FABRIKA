const vehicleModel = require("../../../DB/model/vehicle");
const userModel = require("../../../DB/model/user");
const eventModel = require("../../../DB/model/event");
var jwt = require("jsonwebtoken");


const getEvent = async (req,res) => {
   try{
   const eventaya = await eventModel.findById(req.params.eventID);
   console.log(eventaya);
   res.json(eventaya);
   }catch (error) {
      res.status(400).json({ message: error.message });
   }
};


module.exports = {
   getEvent,
};