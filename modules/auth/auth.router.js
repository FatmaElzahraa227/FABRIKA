const { signUp,signUpMobile, signIn, forgotPassword,  resetPassword, codeVerification , confirmEmail, changePassword, /*verifyCode, updateEmail*/ } = require('./controller/auth.controller');
const router = require('express').Router();
const authValidation = require("./auth.validator");
const validationFun = require('../../middleware/validation');
router.post("/signUp",validationFun(authValidation.signUp),signUp);
router.post("/signUpMobile",validationFun(authValidation.signUpMobile),signUpMobile);
router.post("/signIn",validationFun(authValidation.signIn),signIn);
router.get("/confirm/:token", confirmEmail);
// router.get("/confirm",confirmEmail);
router.post("/forgotPassword",validationFun(authValidation.forgotPassword), forgotPassword);
router.patch("/resetPassword/:email",validationFun(authValidation.resetPassword),/*verifyCode,*/ resetPassword);
router.patch("/changePassword/:email",validationFun(authValidation.changePassword),/*verifyCode,*/ changePassword);
router.patch("/codeVerification",validationFun(authValidation.codeVerification),/*verifyCode,*/ codeVerification);
//router.patch("/updateEmail", updateEmail);

require("dotenv").config();


module.exports = router;
