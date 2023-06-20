var jwt = require("jsonwebtoken");
const userModel = require("../DB/model/user");
const vehicleModel = require("../DB/model/vehicle");
const accessroles = {
   admin: "admin",
   user: "user"
}

const auth = (accessroles) => {
   return async (req, res, next) => {
      if(!req.headers || req.headers == undefined || req.headers == null || !req.headers["authorization"] || 
      !req.headers["authorization"].startsWith('Bearer')){
         res.status(400).json({message: "Bad authorization key"});
      }else{
         let authToken = req.headers["authorization"];
         let token = authToken.split(" ")[1]
         let verifiedkey = await jwt.verify(token, process.env.verifyTokenKey);
         
         if(verifiedkey){
            let user = await userModel.findById(verifiedkey.id)
            if(accessroles.includes(user.role)){
               if(user){
                  req.userid = user._id;  
                  next()
               }else{
                  res.status(404).json({message: "No valid ID in sent token."});
               }
            }else{
               res.status(401).json({message: "You're not authorized."});

            }
         }
      }
   }
}

const getVehicle = () => {
   return async (req, res, next) =>{
      try{
         if(!req.headers || req.headers == undefined || req.headers == null || !req.headers["authorization"] || 
      !req.headers["authorization"].startsWith('Bearer')){
         res.status(400).json({message: "Bad authorization key"});
      }else{
         let authToken = req.headers["authorization"];
         let token = authToken.split(" ")[1]
         let verifiedkey = await jwt.verify(token, process.env.verifyTokenKey);
         // console.log(verifiedkey);
         if(verifiedkey){
            let vehicleaya = await vehicleModel.findById(verifiedkey.vehicle._id)
            console.log(vehicleaya._id);
               if(vehicleaya){
                   req.vehicleid = vehicleaya._id;
                  next()
               } else {
                  res.status(404).json({message: "No valid ID in sent token."});
               }
         }
      }
      }catch(error){
         res.status(400).json({ message: error.message });
      }
   }
}

module.exports = {
   accessroles,
   auth,
   getVehicle
};