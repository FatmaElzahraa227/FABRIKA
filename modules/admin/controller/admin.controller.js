const userModel = require("../../../DB/model/user");
const messageModel = require("../../../DB/model/message");
const vehicleModel = require("../../../DB/model/vehicle");
const eventModel = require("../../../DB/model/event");
const qaModel = require("../../../DB/model/QA");
const notificationModel = require("../../../DB/model/notification");
var jwt = require("jsonwebtoken");
// const QRCode = require('qrcode');
// const sendEmail = require("../../../service/sendEmail");

const userChart = async (req, res) => {
  try {
    var usersByDate = await userModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d", 
              date: "$createdAt"
            }
          },
          count: { $sum: 1 },
        }, 
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const dates = usersByDate.map((doc) => new Date(doc._id)); 
    const counts = usersByDate.map((doc) => doc.count);
    const totalUsers = await userModel.countDocuments(); 
    const totalCars = await vehicleModel.countDocuments(); 

    console.log(dates);
    console.log(counts);
    console.log("Total number of users: ", totalUsers);
    res.json({ message: "lp", dates, counts, totalUsers,totalCars  });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getQA = async (req, res) => {
  const freQAQ = await qaModel.find().exec();
  //   console.log(freQAQ);
  res.json({ message: "he5a", freQAQ });
};

const getNotifications = async (req, res) => {
  try {
    const newNotis = await notificationModel.find().exec();
    while (newNotis) {
      const unviewed = await notificationModel.findOne({ view_status: false });
      if (unviewed) {
        const makeViewed = await notificationModel.findOneAndUpdate(
          { view_status: false },
          { view_status: true }
        );
      } else {
        break;
      }
    }
    res.json({ message: "You have new notifications.", newNotis });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const retrieveMessages = async (req, res) => {
  try {
    console.log("hi");
    const newMsg = await messageModel.find().exec();
    res.json({ message: "New Messages!.", newMsg });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getQA,
  getNotifications,
  retrieveMessages,
  userChart,
};
