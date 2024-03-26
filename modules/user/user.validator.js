const Joi = require("joi");

const deleteUser = {
   body: Joi.object().required()
   .keys({
     email: Joi.string().email().required(),}),
  };

const updateEmail = {
   body: Joi.object().required()
   .keys({
     email: Joi.string().email().required(),}),
  };

  const sendMessage = {
   body: Joi.object().required()
   .keys({

     full_name: Joi.string().required().min(6),
     email: Joi.string().email().required(),
     message: Joi.string().required().min(10),
   
   }),
  };

  const safeResetPassword = {
    body: Joi.object().required()
   .keys({
    newPassword: Joi.string().required()
   }),
  };

module.exports = {
   deleteUser,
   updateEmail,
   sendMessage,
   safeResetPassword
};