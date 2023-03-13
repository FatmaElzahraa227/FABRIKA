const { signUp, signIn, resetPassword, /*confirmEmail, sendCode, updateEmail*/ } = require('./controller/auth.controller');
const router = require('express').Router();
const authValidation = require("./auth.validator");
const validationFun = require('../../middleware/validation');

router.post("/signUp",validationFun(authValidation.signUp),signUp);
router.post("/signIn",validationFun(authValidation.signIn),signIn);
// router.get("/confirm/:token", confirmEmail);
// router.get("/confirm",confirmEmail);
// router.post("/sendCode",validationFun(authValidation.sendCode), sendCode);
router.patch("/resetPassword",validationFun(authValidation.forgetPassword), resetPassword);
//router.patch("/updateEmail", updateEmail);

require("dotenv").config();


module.exports = router;
