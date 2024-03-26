
const { boolean } = require('joi');
const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
   
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
   fullname: {type: String, required:true},
   action: {type: String, required:true},
   view_status: {type: Boolean, default: false},
   
}, {
   timestamps: true
})

const notificationModel = mongoose.model('notification', notificationSchema)

module.exports = notificationModel