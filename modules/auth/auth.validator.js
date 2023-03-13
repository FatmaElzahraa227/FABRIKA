const Joi = require("joi");

const signUp = {
  body: Joi.object()
    .required()
    .keys({
      firstName: Joi.string().required().min(3).max(15),
      lastName: Joi.string().required().min(3).max(15),
      email: Joi.string().email().required(),
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
   body: Joi.object().required()
   .keys({
     email: Joi.string().email().required(),
     newPassword: Joi.string().required(),
      //   code: Joi.number().required(),
     cnewPassword: Joi.string().valid(Joi.ref("newPassword")).required()
   }),
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
    forgetPassword
    };