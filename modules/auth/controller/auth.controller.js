var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../../DB/model/user");
const sendEmail = require("../../../service/sendEmail");
const { sendNotification } = require("../../../service/notification");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, /*gender,*/ email, password, phone } = req.body;
    const foundedUser = await userModel.findOne({ email });
    const foundedUser2 = await userModel.findOne({ phone });
    function randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    // console.log(rndInt)
    let avatar = "";
    // if( gender == "male" ){
    //   const rndInt = randomIntFromInterval(1, 3)
    //   switch (rndInt){
    //     case 1:
    //       avatar = "../../../uploads/avatars/male1.png";
    //       break;
    //     case 2:
    //       avatar = "../../../uploads/avatars/male2.png";
    //       break;
    //     case 3:
    //       avatar = "../../../uploads/avatars/male3.png";
    //       break;
    //   }
    // } else if (gender == "female"){
    //   const rndInt = randomIntFromInterval(1, 2)
    //   switch (rndInt){
    //     case 1:
    //       avatar = "../../../uploads/avatars/female1.png";
    //       break;
    //     case 2:
    //       avatar = "../../../uploads/avatars/female2.png";
    //       break;
    //   }
    // }
    if (foundedUser) {
      res.status(400).json({ message: "Email already exists" });
    } else if (foundedUser2) {
      res.status(400).json({ message: "Phone number already exists" });
    } else {
      const user = new userModel({
        firstName,
        lastName,
       /* gender,*/
        avatar,
        email,
        password,
        phone,
      });
      const savedUser = await user.save();
        var token = jwt.sign({ id: savedUser._id }, process.env.verifyTokenKey);
        let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
        await sendEmail(
          email,
          `<a href=${URL}>Please click here to confirm your email</a>`
        );
        sendNotification(savedUser._id, "is new to FABRIKA!.")
      res
        //.status(StatusCodes.CREATED)
        .json({ message: "Added Done", savedUser, token });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const signUpMobile = async (req, res) => {
  try {
    const { email, password, /*gender*/ } = req.body;
    const foundedUser = await userModel.findOne({ email }, { maxTimeMS: 30000 });
    if (foundedUser) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      const rndInt = randomIntFromInterval(1, 2)
      console.log(rndInt)
      let avatar = "";
      // if( gender == "male" ){
      //   switch (rndInt){
      //     case 1:
      //       avatar = "../../../uploads/avatars/male1.png";
      //       break;
      //     case 2:
      //       avatar = "../../../uploads/avatars/male2.png";
      //       break;
      //   }
      // } else if (gender == "female"){
      //   switch (rndInt){
      //     case 1:
      //       avatar = "../../../uploads/avatars/female1.png";
      //       break;
      //     case 2:
      //       avatar = "../../../uploads/avatars/female2.png";
      //       break;
      //   }
      // }
      const user = new userModel({
        email,
        password,
        /*gender,*/
        avatar
      });
      const savedUser = await user.save();
       var token = jwt.sign({ id: savedUser._id }, process.env.verifyTokenKey);
       let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
       await sendEmail(
         email,
         `<a href=${URL}>Please click here to confirm your email</a>`
       );
       sendNotification(savedUser._id, "is new to FABRIKA!.")
      res
        //.status(StatusCodes.CREATED)
        .json({ message: "Added Done", savedUser });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const confirmEmail = async (req, res) => {
   try {
     let { token } = req.params;

     if (token == undefined || token == null || !token) {
       res.status(404).json({ message: "You should have a token" });
     } else {
       let decoded = jwt.verify(token, process.env.verifyTokenKey);
       if (decoded) {
         let { id } = decoded;
         let foundedUser = await userModel.findById(id);
         if (foundedUser) {
           if (foundedUser.Confirmed) {
             res.status(400).json({ message: "Email already confirmed" });
           } else {
             let updateUser = await userModel.findByIdAndUpdate(
               foundedUser._id,
               { Confirmed: true },
               { new: true }
             );
             res
               .status(200)
               .json({ message: "Email confirmed successfully" /*,updateUser*/ });
           }
         } else {
           res.status(400).json({ message: "invalid email" });
         }
       } else {
         res.status(403).json({ message: "Invalid token" });
       }
     }
   } catch (error) {
     res.status(400).json({ message: "Invalid token", error });
   }
};



const signIn = async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  const foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
   if (foundedUser.IsDeleted == true) {
      res.json({ message: "Your account is deleted." });
    } else if ( !foundedUser.IsDeleted) {
      bcrypt.compare(password, foundedUser.password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            { id: foundedUser._id },
            process.env.verifyTokenKey
          );
          res.json({ message: "ya welcome ya welcome", token });
        } else {
          res.status(422).json({ message: "Ektb el password sa7." });
        }
      });
    }
  } else {
    res.status(404).json({ message: "Please register first." });
  }
};



const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res
      .status(404)
      .json({ message: "Email not found, please register first." });
  } else {
    const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 100);
    msg = `<p>Use this 4-digit code to reset your password : ${code} </p>`;
    await userModel.findByIdAndUpdate(user._id, { code });
    sendEmail(
      email,
      msg,
      "Account Password Reset.",
      "If you're not trying to reset your password, Ignore this email."
    );
    res.json({ message: "Code sent." });
  }
};



const codeVerification = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await userModel.findOne({ code });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "Code is incorrect" });
    } else {
      if (user.code.toString() != code.toString()) {
        res.status(409).json({ message: "Code is incorrect!" });
      } else {
        res.status(200).json({ message: "success" });
        const updatedUser = await userModel.findByIdAndUpdate(
          user._id,
          {code:' '},
          { new: true }
        );
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { email } = req.params;
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "Not Found" });
    } else {
      const hashedPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.saltRound)
      );
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { password: hashedPassword},
        { new: true }
      );
      sendNotification(updatedUser._id, "has reset their password.")
      res.status(200).json({ message: "Password reset!", updatedUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { email } = req.params;
    const user = await userModel.findOne({ email });
    console.log(user);
    if ( oldPassword ){
      bcrypt.compare( oldPassword, user.password, async function (err, result) {
        if (result) {
          if(oldPassword==newPassword){
            res.status(422).json({ message: "new password cannot be your old password" });
          }else{
            const hashedPassword = await bcrypt.hash(
              newPassword,
              parseInt(process.env.saltRound)
            );
            const updatedUser = await userModel.findByIdAndUpdate(
              user._id,
              { password: hashedPassword },
              { new: true }
            ); 
            const blabla = "I Love Fatouma."
            res.json({message: "Password changed!", blabla })
          }
          
        } else {
          res.status(422).json({ message: "Old password is incorrect, try to reset your password instead." });
        }});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  codeVerification,
  signUpMobile,
  confirmEmail,
  changePassword,
};

