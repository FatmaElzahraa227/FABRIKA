const vehicleModel = require("../../../DB/model/vehicle");
const userModel = require("../../../DB/model/user");
const eventModel = require("../../../DB/model/event");
var jwt = require("jsonwebtoken");
const { sendNotification } = require("../../../service/notification");

const sendEventReq = async (req, res) => {
  try {
    console.log(req.files);
    if (req.fileUploadError) {
      res.json({ message: "Invalid file type." });
    } else {
      let fileName = "";
      const VfileUrls = [];
      const NPfileUrls = [];
      const WAfileUrls = [];
      const VINfileUrls = [];
      for (let i = 0; i < req.files.Images.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/generalimages/${req.files.Images[i].filename}`;
        VfileUrls.push(fileName);
      }
      for (let i = 0; i < req.files.numPlates.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/numplateimages/${req.files.numPlates[i].filename}`;
        NPfileUrls.push(fileName);
      }
      for (let i = 0; i < req.files.walkaround.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/walkaroundvideos/${req.files.walkaround[i].filename}`;
        WAfileUrls.push(fileName);
      }
      for (let i = 0; i < req.files.VIN.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/VINpics/${req.files.VIN[i].filename}`;
        VINfileUrls.push(fileName);
      }
      
      const { event_type, event_desc } = req.body;
      const {sent_by} = req.params;
      const newEvent = new eventModel({
        sent_by, event_type, vehicle_pics: VfileUrls, numplate_pics: NPfileUrls, walkaround_vid: WAfileUrls, vin_pics: VINfileUrls, event_desc
      });

      const savedEvent = await newEvent.save();
      res.json({ message: "all good", savedEvent });
    }
  } catch (error) {
    console.log(req.files)
    res.status(400).json({ message: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const eventaya = await eventModel.findById(req.params.eventID);
    var token = jwt.sign({ event: eventaya }, process.env.verifyTokenKey);
    console.log(token);
    res.json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = {
  getEvent,
  sendEventReq,
};
