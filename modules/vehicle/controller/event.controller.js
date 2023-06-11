const vehicleModel = require("../../../DB/model/vehicle");
const userModel = require("../../../DB/model/user");
const eventModel = require("../../../DB/model/event");
var jwt = require("jsonwebtoken");
const { sendNotification } = require("../../../service/notification");

const sendEventReq = async (req, res) => {
  try {
    console.log(req.files, req.body);
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
      console.log(VfileUrls, NPfileUrls, WAfileUrls, VINfileUrls);
      // const event_type = req.event_type;
      // const event_desc = req.event_desc;
      const { event_type, event_desc } = req.body;
      const sent_by = req.userid;
      const newEvent = new eventModel({
        sent_by, event_type, vehicle_pics: VfileUrls, numplate_pics: NPfileUrls, walkaround_vid: WAfileUrls, vin_pics: VINfileUrls, event_desc
      });
      const savedEvent = await newEvent.save();

      // console.log(fileName); // This should now output the last generated fileName in the loop
      
      sendNotification( req.userid, "Sent an event request!")
      res.json({ message: "all good", savedEvent });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {};

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
  addEvent,
};
