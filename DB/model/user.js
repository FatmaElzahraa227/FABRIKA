
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
   
   
   firstName: {type: String}, 
   lastName: {type: String},
   email: {type: String, required:true, unique:true},
   phone: {type: String,unique:true},
   // Confirmed: {type: Boolean, default: false},
   password: {type: String, required:true},
   owned_vehicles: [{type: mongoose.Schema.Types.ObjectId, ref: 'vehicles'}],
   role: {type: String, default: 'user'},
   code: {type: Number,},
   search_history: [{type: mongoose.Schema.Types.ObjectId, ref: 'vehicles'}]
   
   
}, {
   timestamps: true
})
userSchema.pre("save", async function (next) {
   this.password = await bcrypt.hashSync(this.password,parseInt(process.env.saltRounds))
 }, {
   collection: 'users' // specify the collection name
 });
const userModel = mongoose.model('user', userSchema)

module.exports = userModel