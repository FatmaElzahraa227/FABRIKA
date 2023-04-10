
const mongoose = require('mongoose');


const QASchema = new mongoose.Schema({
   
   question: {type:String},
   answer: {type:String},
   
}, {
   timestamps: true
})

const qaModel = mongoose.model('QA', QASchema)

module.exports = qaModel