const Joi = require("joi");

const addVehicle = {
  body: Joi.object()
    .required()
    .keys({
      vehicle_vin: Joi.string().required().min(1),
      vehicle_make: Joi.string().required().min(2).max(20),
      vehicle_model: Joi.string().required(),
      pictures: Joi.array()
    }),
};

const getVehicleData = {
  params: Joi.object()
    .required()
    .keys({
      vehicle_vin: Joi.string().required().min(1)
    }),
};
const getEvent = {
  params: Joi.object()
    .required()
    .keys({
      eventID: Joi.string().required().min(1)
    }),
};

const editVehicle = {
  body: Joi.object()
    .required()
    .keys({
      vehicle_vin: Joi.string().min(1).max(20),
      vehicle_make: Joi.string().min(2).max(20),
      vehicle_model: Joi.string()
    })
}



module.exports = {
   addVehicle,
   getVehicleData,
   editVehicle
};