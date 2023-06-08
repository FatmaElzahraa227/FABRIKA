const userModel = require("../../../DB/model/user");
const messageModel = require("../../../DB/model/message");
const vehicleModel = require("../../../DB/model/vehicle");
const eventModel = require("../../../DB/model/event");
const qaModel = require("../../../DB/model/QA");
const notificationModel = require("../../../DB/model/notification");
var jwt = require("jsonwebtoken");
// const QRCode = require('qrcode');
// const sendEmail = require("../../../service/sendEmail");

const getQA = async (req, res) => {
  const freQAQ = await qaModel.find().exec();
//   console.log(freQAQ);
  res.json({ message: "he5a", freQAQ }); 
};

const getNotifications = async (req, res) => {
try {
  const newNotis = await notificationModel.find().exec();
  while(newNotis){
    
    const unviewed = await notificationModel.findOne({view_status: false});
    if(unviewed){
      const makeViewed = await notificationModel.findOneAndUpdate({view_status: false}, {view_status: true});
    }else{
      break;
    }
  };
  res.json({ message: "You have new notifications.", newNotis });
} catch (error) {
  res.json({message: error.message});
}
  
  
  
};

module.exports = {
  getQA,
  getNotifications
};
