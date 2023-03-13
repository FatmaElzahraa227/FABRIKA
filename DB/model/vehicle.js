
const mongoose = require('mongoose');
const  Joi  = require('joi');



const vehicleSchema = new mongoose.Schema({
   
   vehicle_vin: {type: String, required:true, unique:true},
   vehicle_make: {type:String, required:true}, 
   vehicle_model: {type:String, required:true},
   model_year: {type:Number, required:false},
   displacement: {type:Number, default: false},
   extra_features: {type:String, required:false},
   owner_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "user",  required:true }],
   insured_by: {type: mongoose.Schema.Types.ObjectId, ref: 'insurance'},
   is_stolen: {type:Boolean, default: false},
   is_salvaged: {type:Boolean, default: false},
   is_insured: {type:Boolean, default: false},
   events: {type: mongoose.Schema.Types.ObjectId, ref: 'event'},

   
}, {
   timestamps: true
})

const vehicleModel = mongoose.model('vehicle', vehicleSchema)

module.exports = vehicleModel