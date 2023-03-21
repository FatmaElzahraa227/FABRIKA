const Joi = require("joi");

const signUp = {
  body: Joi.object()
    .required()
    .keys({
      firstName: Joi.string().required().min(3).max(15),
      lastName: Joi.string().required().min(3).max(15),
      email: Joi.string().email().required(),
      phone: Joi.string().required().min(11).max(11),
      password: Joi.string().required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required()
    }),
};

const signIn = {
   body: Joi.object()
     .required()
     .keys({
       email: Joi.string().email().required(),
       password: Joi.string().required()
     }),
 };

 const forgetPassword = {
   params: Joi.object().required().keys({
    useremail: Joi.string().email().required(),
   }),
   body: Joi.object().required()
   .keys({
     newPassword: Joi.string().required(),
     code: Joi.number().required(),
     cnewPassword: Joi.string().valid(Joi.ref("newPassword")).required()
   }),
 };

 const verifyCode = {
  params: Joi.object().required().keys({
    useremail: Joi.string().email().required()
   }),
   body: Joi.object().required().keys({
    userCode: Joi.number().required().min(4).max(4)
   })
 };

 const sendCode = {
  body: Joi.object().required()
  .keys({
    email: Joi.string().email().required(),}),
 };

module.exports = {
    signUp,
    signIn,
    sendCode,
    verifyCode,
    forgetPassword
    };