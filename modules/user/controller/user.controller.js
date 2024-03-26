const userModel = require("../../../DB/model/user");
const messageModel = require("../../../DB/model/message");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const vehicleModel = require("../../../DB/model/vehicle");
const eventModel = require("../../../DB/model/event");
const { sendNotification } = require("../../../service/notification");
const sendEmail = require("../../../service/sendEmail");

const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userid);
    const searchHistory = userData.search_history; // The array of ids you're searching for.
    const vehicle = await vehicleModel.find({_id:{ $in: searchHistory }});
    sendNotification(userData._id, "Viewed his/her profile.")
    res.json({ message: "he5a", userData, vehicle });
    // sendNotification(userData._id, "Viewed his profile.")
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateEmail = async (req, res) => {
  const user = await userModel.findById(req.userid);

  const up = await userModel.findOne({ email: req.body.email });
  if (up) {
    if (user.email == up.email) {
      res.status(400).json({ message: "This is your old email." });
    } else {
      res.status(400).json({ message: "Email already exists." });
    }
  } else if (!up && user.email != req.body.email) {
    const user = await userModel.findByIdAndUpdate(
      req.userid,
      { email: req.body.email /*Confirmed: false*/ },
      { new: true }
    );
    sendNotification(user._id, "Updated their e-mail.")
    res.json({ message: "DONE.", user });
    var token = jwt.sign({ id: user._id }, process.env.verifyTokenKey);
    //  let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
    //  await sendEmail(
    //    req.body.email,
    //    `<a href=${URL}>Please click here to confirm your email</a>`
    //  );
  }
  // res.json({user});
  // console.log(user);
};

const deleteUser = async (req, res) => {
  const user = await userModel.findById(req.userid);
  const tobedel = await userModel.findOne({ email: req.body.email });
  console.log(user);
  console.log(tobedel);
  if (user.role == "admin") {
    if (user.email == tobedel.email) {
      console.log({ message: "user is the account owner" });
      await userModel.findOneAndRemove({ email: tobedel.email });
      res.json({ message: "Removed" });
    } else if (tobedel.role == "user") {
      await userModel.findOneAndRemove({ email: tobedel.email });
      res.json({ message: "Removed" });
    } else if (tobedel.role == "admin") {
      res.status(401).json({ message: "You can't remove another admin." });
    }
    console.log({ message: "user is admin" });
  } else if (
    (user.role == tobedel.role) == "user" &&
    user.email == tobedel.email
  ) {
    console.log({ message: "user is the account owner" });
    await userModel.findOneAndRemove({ email: tobedel.email });
    res.json({ message: "Removed" });
  } else if (
    (user.role == tobedel.role) == "user" &&
    user.email != tobedel.email
  ) {
    res.status(401).json({ message: "You can't delete another user." });
  } else {
    res.status(400).json({ message: "Invalid" });
  }
};

const softDelete = async (req, res) => {
  const user = await userModel.findById(req.userid);
  const tobedel = await userModel.findOne({ email: req.body.email });
  console.log(user);
  console.log(tobedel);
  if (user.role != "admin") {
    res.status(401).json({ message: "You're not authorized." });
  } else if (tobedel.role == "admin") {
    res.status(401).json({ message: "You can't delete another admin." });
  } else {
    await userModel.findByIdAndUpdate(
      tobedel._id,
      { IsDeleted: true },
      { new: true }
    );
    res.json({ message: "Deleted.", tobedel });
  }
};

const sendMessage = async (req, res) => {
  try {
    const senderid = req.userid;
    console.log(senderid);
    const { full_name, email, message } = req.body;
    const messageaya = new messageModel({ full_name, email, message, senderid });
    const savedMessage = await messageaya.save();
    return res.json({ message: "Sender:", full_name, email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

safeResetPassword = async (req, res) => {
  try{
    const { newPassword } = req.body;
    const user = await userModel.findById(req.userid);
    console.log(user);
    const hashedPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.saltRound)
    );
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    res.json({ message: "Done", updatedUser});
  } catch(error){
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  getProfile,
  updateEmail,
  deleteUser,
  softDelete,
  sendMessage,
  safeResetPassword,
};
