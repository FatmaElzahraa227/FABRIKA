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

module.exports = {
   deleteUser,
   updateEmail
};