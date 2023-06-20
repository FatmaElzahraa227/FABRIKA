
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
   
   // event_id: {type: Number, required: true, unique: true},
   sent_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   event_type: { type: String, default: 'accident' },
   event_title: { type: String, },
   vehicle_pics: [{ type: String, required: true }],
   numplate_pics: [{ type: String, required: true }],
   walkaround_vid: [{ type: String, required: true }],
   vin_pics: [{type: String, required: true }],
   event_desc: { type: String, required: false },
   event_date: { type: String, },
   // event_media: [ String ],
   event_damages: { type: String }, 
   affected_vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle' },
   insurance_agency: { type: mongoose.Schema.Types.ObjectId, ref: 'insurance' },
   cover_icon:{ type: String },
   status: { type: String, default: 'Pending' },
   
}, {
   timestamps: true 
})

const eventModel = mongoose.model( 'event', eventSchema )

module.exports = eventModel