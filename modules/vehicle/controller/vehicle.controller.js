const vehicleModel = require("../../../DB/model/vehicle");
const userModel = require("../../../DB/model/user");
var jwt = require("jsonwebtoken");

const addVehicle = async (req, res) => {
  const { vehicle_vin, vehicle_make, vehicle_model } = req.body;
  const user = await userModel.findById(req.userid);
  const owner_id = user._id;

  //  console.log(owner_id);
  const foundVehicle = await vehicleModel.findOne({ vehicle_vin });
  if (foundVehicle) {
    res.status(400).json({ message: "Vehicle already exists." });
  } else {
    const vehicle = new vehicleModel({
      vehicle_vin,
      vehicle_make,
      vehicle_model,
      owner_id,
    });
    const savedVehicle = await vehicle.save();
    res.json({ message: "Added.", savedVehicle });
    console.log(savedVehicle);
  }
};

const getVehicleData = async (req, res) => {
  const vehicleData = await vehicleModel.findOne({
    vehicle_vin: req.body.vehicle_vin,
  });

  var token = jwt.sign({ id: vehicleData._id }, process.env.verifyTokenKey);
  console.log(vehicleData.id);

  res.json({ message: "Here you go", token, vehicleData });
};

// const updatePic = async (req, res) => {
//   try {
//     if (req.fileUploadError) {
//       res.status(422).json({ message: "Invalid file" });
//     } else {
//       const vehicleaya = await vehicleModel.findById(req.vehicleId);
//       if (vehicleaya) {
//         let imagesURLS = [];
//         for (let i = 0; i < req.files.length; i++) {
//           let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.files[i].filename}`;
//           imagesURLS.push(imgURL);
//         }
//         let updatedUser = await vehicleModel.findByIdAndUpdate(
//           user._id,
//           { coverPictures: imagesURLS , $inc: { __v: 1 }},
//           { new: true }
//         );
//         res.status(200).json({
//           message: "Cover pictures updated successfully",
//           updatedUser,
//         });
//       } else {
//         res.status(404).json({ message: "Invalid user" });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updatePic = async (req, res) => {
  try {
    // console.log(req.files);
    const vehicle_vin = req.body.VIN;
    const vehicle = await vehicleModel.findOne({vehicle_vin});
    //  console.log(vehicle);
    if (vehicle) {
      console.log(req.fileURL);
      let imagesURL = [];
      for (let i = 0; i < req.files; i++) {
        let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.files[i].filename}`;
        imagesURL.push(imgURL);
      }
      let updatedVehicle = await vehicleModel.findOneAndUpdate(
        { vehicle_vin },
        { pictures: imagesURL },
        { new: true }
      );
      console.log("done", updatedVehicle);
      res.json(updatedVehicle);
    } else {
      res
        .status(404)
        .json({ message: "Vehicle not found or VIN is incorrect." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getimage = async (req, res) => {
  try{
    const yarabngeebelimages = await vehicleModel.find({});
    res.json({yarabngeebelimages});
    // vehicleModel.find({}, (err, items) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).send("An error occurred", err);
    //   } else {
    //     res.render("imagesPage", { items: items });
    //   }
    // });
  }
  catch(error){
    res.status(400).json({ message: error.message });
  }
};

// app.get("/articles", async (req, res) => {
//   try {
//     const articles = await Article.find({ });
//     res.send(articles);
//     console.log(articles);
//   } catch (err) {
//     console.log(err);
//   }
// });


const editVehicle = async (req, res) => {
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
  updatePic,
  editVehicle,
  getimage
};
