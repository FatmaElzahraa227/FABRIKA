const userModel = require("../../../DB/model/user");
const messageModel = require("../../../DB/model/message");
var jwt = require("jsonwebtoken");
const qaModel = require("../../../DB/model/QA");
// const vehicleModel = require("../../../DB/model/vehicle");
// const eventModel = require("../../../DB/model/event");
// const QRCode = require('qrcode');
// const sendEmail = require("../../../service/sendEmail");

const getQA = async (req, res) => {
  const freQAQ = await qaModel.find().exec();
//   console.log(freQAQ);
  res.json({ message: "he5a", freQAQ }); 
};

module.exports = {
  getQA,
};
