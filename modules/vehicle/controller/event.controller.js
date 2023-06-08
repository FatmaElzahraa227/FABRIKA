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
      const fileUrls = [];
      for (let i = 0; i < req.files.Images.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/generalimages/${req.files.Images[i].filename}`;
        fileUrls.push(fileName);
      }
      for (let i = 0; i < req.files.numPlates.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/numplateimages/${req.files.numPlates[i].filename}`;
        fileUrls.push(fileName);
      }
      for (let i = 0; i < req.files.walkaround.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/walkaroundvideos/${req.files.walkaround[i].filename}`;
        fileUrls.push(fileName);
      }
      for (let i = 0; i < req.files.VIN.length; i++) {
        fileName = `${req.protocol}://${req.headers.host}/uploads/eventmedia/VINpics/${req.files.VIN[i].filename}`;
        fileUrls.push(fileName);
      }
      // console.log(fileName); // This should now output the last generated fileName in the loop
      // console.log(req.file);

      res.json({ message: "all good", fileUrls });
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
