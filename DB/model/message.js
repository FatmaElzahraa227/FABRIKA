
const mongoose = require('mongoose');




const messageSchema = new mongoose.Schema({
   
   full_name: {type:String, required:true},
   email: {type:String, required:true},
   message: {type:String, required:true},
   
   
}, {
   timestamps: true
})

const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel