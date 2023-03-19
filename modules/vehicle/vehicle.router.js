const { addVehicle, getVehicleData, editVehicle, updatePic, /*getimage,/*confirmEmail, sendCode, updateEmail*/ } = require('./controller/vehicle.controller');
const vehicleValidation = require("./vehicle.validator");
const {auth, getvehicle} = require("../../middleware/auth");
const userAPI = require("../user/userRoles.js");
const {uploadData, handleMulterErr} = require("../../service/uploadFile");


const validationFun = require("../../middleware/validation");

const router = require("express").Router();

router.post("/addVehicle",auth(userAPI.addVehicle),validationFun(vehicleValidation.addVehicle), addVehicle);
router.get("/getVehicleData/:vehicle_vin",auth(userAPI.addVehicle),validationFun(vehicleValidation.getVehicleData), getVehicleData);
router.patch("/updateVehicle",auth(userAPI.addVehicle),validationFun(vehicleValidation.editVehicle), editVehicle);




module.exports = router; 