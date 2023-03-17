const { getProfile, deleteUser, updateEmail, softDelete, sendMessage } = require("./controller/user.controller");
const {auth} = require("../../middleware/auth");
const userAPI = require("./userRoles");
// const {uploadData, handleMulterErr} = require("../../service/uploadFile");
const validationFun = require("../../middleware/validation");
const userVal = require("./user.validator");


const router = require("express").Router();


router.get("/getProfile", auth(userAPI.getDetails), getProfile);
// router.patch("/updateProfilePic", auth(userAPI.getDetails),uploadData("/profilePics").array("image",3),handleMulterErr, updateProfilePic);
// router.patch("/updateCoverPic", auth(userAPI.getDetails),uploadData("/coverPics").array("image",3),handleMulterErr, updateCoverPic);
// router.get("/QR", auth(userAPI.getDetails), QR);
router.patch("/updateEmail", auth(userAPI.updateEmail), validationFun(userVal.updateEmail), updateEmail);
router.delete("/deleteUser", auth(userAPI.deleteUser), deleteUser);
router.patch("/softDelete", auth(userAPI.softDelete), softDelete);
router.post("/contactUs", validationFun(userVal.sendMessage), sendMessage);


module.exports = router; 