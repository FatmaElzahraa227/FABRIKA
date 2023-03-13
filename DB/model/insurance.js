
const mongoose = require('mongoose');


const agencySchema = new mongoose.Schema({
   
   
   agency_id: {type: Number, required:true, unique:true}, 
   agency_name: {type: String, required:true},
   insured_vehicles: [{type: mongoose.Schema.Types.ObjectId, ref: 'vehicles'}],
   
   
}, {
   timestamps: true
})

const insuranceModel = mongoose.model('insurance', agencySchema)

module.exports = insuranceModel