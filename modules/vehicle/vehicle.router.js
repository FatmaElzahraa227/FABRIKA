const { addVehicle, getVehicleData, editVehicle, /*confirmEmail, sendCode, updateEmail*/ } = require('./controller/vehicle.controller');
const vehicleValidation = require("./vehicle.validator");
const {auth} = require("../../middleware/auth");
const userAPI = require("../user/userRoles.js");


const validationFun = require("../../middleware/validation");

const router = require("express").Router();

router.post("/addVehicle",auth(userAPI.addVehicle),validationFun(vehicleValidation.addVehicle), addVehicle);
router.get("/getVehicleData",auth(userAPI.addVehicle),validationFun(vehicleValidation.getVehicleData), getVehicleData);
router.patch("/updateVehicle",auth(userAPI.addVehicle),validationFun(vehicleValidation.editVehicle), editVehicle);




module.exports = router; 