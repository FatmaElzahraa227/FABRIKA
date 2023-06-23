const userModel = require("../DB/model/user");
const notificationModel = require("../DB/model/notification");

const sendNotification = async (userID, action) => {
   try{
      var fullname=''
      // console.log(userID, action); 
      console.log('moj')
      const eluser = await userModel.findById(userID);
      const email=eluser.email;
      if( eluser.firstName==''|| eluser.firstName==null|| eluser.firstName==undefined){
         fullname=email.split('@')[0];
      }else{
          fullname = eluser.firstName + " " + eluser.lastName;

      }
      const newNoti = new notificationModel({ user: userID, fullname, action });
      const saveNoti = await newNoti.save();
      console.log(saveNoti);
   } catch (error) {
      // res.json({message: error.message})
      console.log(error);
   }
}

module.exports = {
   sendNotification
};