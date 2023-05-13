const vehicleModel = require("../../../DB/model/vehicle");
const userModel = require("../../../DB/model/user");
const eventModel = require("../../../DB/model/event");
var jwt = require("jsonwebtoken");

const sendEventReq = async (req, res) => { 
   // let fileName = `${req.protocol}://${req.headers.host}/${}`
}

const addEvent = async (req, res) => {
  
};


const getEvent = async (req,res) => {
   try{
   const eventaya = await eventModel.findById(req.params.eventID);
   var token = jwt.sign({ event: eventaya }, process.env.verifyTokenKey);
   console.log(token);
   res.json(token);
   }catch (error) {
      res.status(400).json({ message: error.message });
   }
};


module.exports = {
   getEvent,
   sendEventReq,
   addEvent
};