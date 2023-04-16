var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../../DB/model/user");
const sendEmail = require("../../../service/sendEmail");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const foundedUser = await userModel.findOne({ email });
    const foundedUser2 = await userModel.findOne({ phone });
    if (foundedUser) {
      res.status(400).json({ message: "Email already exists" });
    } else if (foundedUser2) {
      res.status(400).json({ message: "Phone number already exists" });
    } else {
      const user = new userModel({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      const savedUser = await user.save();
      //  var token = jwt.sign({ id: savedUser._id }, process.env.verifyTokenKey);
      //  let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
      //  await sendEmail(
      //    email,
      //    `<a href=${URL}>Please click here to confirm your email</a>`
      //  );
      res
        //.status(StatusCodes.CREATED)
        .json({ message: "Added Done", savedUser });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const signUpMobile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await userModel.findOne({ email });
    // if (foundedUser) {
    //   res.status(400).json({ message: "Email already exists" });
    // } else {
      const user = new userModel({
        email,
        password,
      });
      const savedUser = await user.save();
      //  var token = jwt.sign({ id: savedUser._id }, process.env.verifyTokenKey);
      //  let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
      //  await sendEmail(
      //    email,
      //    `<a href=${URL}>Please click here to confirm your email</a>`
      //  );
      res
        //.status(StatusCodes.CREATED)
        .json({ message: "Added Done", savedUser });
    // }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    /*if(foundedUser.Confirmed != true){
      res.json({message: "Please confirm your email first."})   blolom
    }else if(foundedUser.Blocked == true){
      res.json({message: "Your account is blocked."})
    }else */ if (foundedUser.IsDeleted == true) {
      res.json({ message: "Your account is deleted." });
    } else if (/*foundedUser.Confirmed &&*/ !foundedUser.IsDeleted) {
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
      res.status(200).json({ message: "Password reset!", updatedUser });
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
  // confirmEmail,
  // verifyCode,
};

// const verifyCode = async(req,res, next) => {

//   const {userCode} = req.body;
//   const {email} = req.params.useremail;
//   const user = await userModel.findOne({email});
//   if (user.code != userCode) {
//     res.status(409).json({message: "Code doesn't match."})
//   } else if(userCode == user.code){
//     next();
//   }

// };


// const resetPassword = async(req,res) => {
//   const { newPassword } = req.body;
//   const {email} = req.params.useremail;
//   const user = await userModel.findOne({email});

//   const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRounds))
//   await userModel.findByIdAndUpdate(user._id, {password: hashedPassword, code:""})
//   res.json({message: "Password reset."})
// };

// const confirmEmail = async (req, res) => {
//    try {
//      let { token } = req.params;

//      if (token == undefined || token == null || !token) {
//        res.status(404).json({ message: "You should have a token" });
//      } else {
//        let decoded = jwt.verify(token, process.env.verifyTokenKey);
//        if (decoded) {
//          let { id } = decoded;
//          let foundedUser = await userModel.findById(id);
//          if (foundedUser) {
//            if (foundedUser.Confirmed) {
//              res.status(400).json({ message: "Email already confirmed" });
//            } else {
//              let updateUser = await userModel.findByIdAndUpdate(
//                foundedUser._id,
//                { Confirmed: true },
//                { new: true }
//              );
//              res
//                .status(200)
//                .json({ message: "Email confirmed successfully", updateUser });
//            }
//          } else {
//            res.status(400).json({ message: "invalid email" });
//          }
//        } else {
//          res.status(403).json({ message: "Invalid token" });
//        }
//      }
//    } catch (error) {
//      res.status(400).json({ message: "Invalid token", error });
//    }
// };

// const sendCode = async(req,res) => {
//   const {email} = req.body;
//   const user = await userModel.findOne({email});
//   if (!user) {
//     res.status(404).json({message: "Email not found, please register first."})
//   }else{
//     const code = Math.floor(Math.random()*(9999-1000+1)+100)
//     msg = `<p>Use this 4-digit code to reset your password : ${code} </p>`
//     await userModel.findByIdAndUpdate(user._id, {code})
//     sendEmail(email, msg)
//     res.json({message: "Code sent."})
//   }
// };
