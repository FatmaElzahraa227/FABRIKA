const Joi = require("joi");

const addVehicle = {
  body: Joi.object()
    .keys({
      vehicle_vin: Joi.string().required().min(1),
      vehicle_make: Joi.string().required().min(1).max(20),
      vehicle_model: Joi.string().required(),
      model_year: Joi.string().required(),
      displacement: Joi.string().required(),
      color: Joi.string().required(),
      mileage_years_x: Joi.array().required(),
      mileage_miles_y: Joi.array().required(),
      extra_features: Joi.string().allow(''),
      is_stolen: Joi.boolean(),
      is_salvaged: Joi.boolean(),
      is_insured: Joi.boolean(), 
      has_mileage: Joi.boolean(),
      has_sales_history: Joi.boolean(),
      has_service_history: Joi.boolean(),
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
    .keys({
      vehicle_make: Joi.string().min(2).max(20),
      vehicle_model: Joi.string(),
      model_year: Joi.string(),
      displacement: Joi.string(),
      color: Joi.string(),
      mileage_years_x: Joi.array(),
      mileage_miles_y: Joi.array(),
      extra_features: Joi.string().allow(''),
      is_stolen: Joi.boolean(),
      is_salvaged: Joi.boolean(),
      is_insured: Joi.boolean(),
      has_mileage: Joi.boolean(),
      has_sales_history: Joi.boolean(),
      has_service_history: Joi.boolean(),
      pictures: Joi.array()
    })
}



module.exports = {
   addVehicle,
   getVehicleData,
   editVehicle
};