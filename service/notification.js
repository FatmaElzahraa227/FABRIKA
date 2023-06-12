const userModel = require("../DB/model/user");
const notificationModel = require("../DB/model/notification");

const sendNotification = async (userID, action) => {
   try{
      // console.log(userID, action);
      const eluser = await userModel.findById(userID);
      const fullname = eluser.firstName + " " + eluser.lastName;
      const newNoti = new notificationModel({ user: userID, fullname, action });
      const saveNoti = await newNoti.save();
      console.log(saveNoti);
   } catch (error) {
      res.json({message: error.message})
   }
}

module.exports = {
   sendNotification
};