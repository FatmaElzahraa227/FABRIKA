const { addVehicle, getVehicleData, editVehicle, getDataToEdit, updatePic, } = require('./controller/vehicle.controller');
const { getEvent, sendEventReq } = require('./controller/event.controller');
const vehicleValidation = require("./vehicle.validator");
const {auth, getVehicle} = require("../../middleware/auth");
const userAPI = require("../user/userRoles.js");
const { multerFun } = require("../../service/multer")
const {uploadData, handleMulterErr} = require("../../service/uploadFile");


const validationFun = require("../../middleware/validation");

const router = require("express").Router();

router.post("/addVehicle",auth(userAPI.addVehicle),validationFun(vehicleValidation.addVehicle), addVehicle);
router.get("/getVehicleData/:vehicle_vin",auth(userAPI.getVehicle),validationFun(vehicleValidation.getVehicleData), getVehicleData);
router.get("/getDataToEdit/:vehicle_vin",auth(userAPI.addVehicle),validationFun(vehicleValidation.getVehicleData), getDataToEdit);
router.patch("/updateVehicle",getVehicle(),validationFun(vehicleValidation.editVehicle), editVehicle);
router.get("/getEvent/:eventID",auth(userAPI.getEvent), getEvent);
router.post("/sendEventReq", multerFun('generalimages').fields([{name: 'Images', maxCount: 10},{name: 'numPlates', maxCount: 2},{name: 'VIN', maxCount: 2},{name: 'walkaround', maxCount: 2}]),  sendEventReq);

// multerFun('generalimages').fields([{name: 'Images', maxCount: 2},{name: 'numPlates', maxCount: 2}]) 


module.exports = router; 