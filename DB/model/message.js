
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   
   full_name: {type:String, required:true},
   email: {type:String, required:true},
   message: {type:String, required:true},
   senderid: { type: mongoose.Schema.Types.ObjectId, ref: "user",},
   view_status: {type: Boolean, default: false},
   
}, {
   timestamps: true
})

const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel