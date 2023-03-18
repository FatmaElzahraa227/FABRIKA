const vehicleModel = require("../../../DB/model/vehicle");
const userModel = require("../../../DB/model/user");
var jwt = require("jsonwebtoken");

const addVehicle = async (req,res) => {
   
   const { vehicle_vin, vehicle_make, vehicle_model } = req.body;
   const user = await userModel.findById(req.userid);
   const owner_id = user._id;

  //  console.log(owner_id);
   const foundVehicle = await vehicleModel.findOne({ vehicle_vin });
     if (foundVehicle) {
       res.status(400).json({ message: "Vehicle already exists." });
     }else{
      const vehicle = new vehicleModel({ vehicle_vin, vehicle_make, vehicle_model, owner_id });
      const savedVehicle = await vehicle.save();
      res.json({message: "Added.", savedVehicle})
      console.log(savedVehicle);
     }

};

const getVehicleData = async (req,res) => {
  
  const vehicleData = await vehicleModel.findOne({vehicle_vin: req.params.vehicle_vin});


  var token = jwt.sign({ id: req.userid, vehicle: vehicleData }, process.env.verifyTokenKey);
  
  res.json({message: "Here you go", token, vehicleData});
};

const editVehicle = async (req,res) => {
   
  // const { vehicle_vin, vehicle_make, vehicle_model } = req.body;
  const currentUserID = await userModel.findById(req.userid);
  const saidVehicle = await vehicleModel.findById(req.vehicleid);

  console.log(currentUserID);
  console.log(saidVehicle);





  // console.log(owner_id);
  // const foundVehicle = await vehicleModel.findOne({ vehicle_vin });
  //   if (foundVehicle) {
  //     res.status(400).json({ message: "Vehicle already exists." });
  //   }else{
  //    const vehicle = new vehicleModel({ vehicle_vin, vehicle_make, vehicle_model, owner_id });
  //    const savedVehicle = await vehicle.save();
  //    res.json({message: "Added.", savedVehicle})
  //    console.log(savedVehicle);
  //   }

};



module.exports = {
   addVehicle,
   getVehicleData,
   editVehicle
};