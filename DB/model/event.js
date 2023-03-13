
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
   
   
   event_id: {type: Number, required:true, unique:true}, 
   event_type: {type: String, required:true},
   event_title: {type: String, required:true},
   event_desc: {type: String, required:false},
   event_date: {type: Date, required:true},
   event_damages: {type: Date, required:false},
   insurance_agency: {type: mongoose.Schema.Types.ObjectId, ref: 'insurance'},
   
   
}, {
   timestamps: true
})

const eventModel = mongoose.model('event', eventSchema)

module.exports = eventModel