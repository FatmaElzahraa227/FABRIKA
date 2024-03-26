const { getProfile, deleteUser, updateEmail, softDelete, sendMessage, safeResetPassword } = require("./controller/user.controller");
const {auth} = require("../../middleware/auth");
const userAPI = require("./userRoles");
// const {uploadData, handleMulterErr} = require("../../service/uploadFile");
const validationFun = require("../../middleware/validation");
const userVal = require("./user.validator");
const sendEventReq = require("../vehicle/controller/event.controller")
const { multerFun } = require("../../service/multer")

const router = require("express").Router();

router.get("/getProfile", auth(userAPI.getDetails), getProfile);
router.patch("/updateEmail", auth(userAPI.updateEmail), validationFun(userVal.updateEmail), updateEmail);
router.delete("/deleteUser", auth(userAPI.deleteUser), deleteUser);
router.patch("/softDelete", auth(userAPI.softDelete), softDelete);
router.post("/contactUs", auth(userAPI.getDetails), validationFun(userVal.sendMessage), sendMessage);
router.patch("/safeResetPassword", auth(userAPI.getDetails),validationFun(userVal.safeResetPassword), safeResetPassword);


module.exports = router; 