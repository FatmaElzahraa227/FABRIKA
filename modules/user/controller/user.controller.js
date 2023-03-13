const userModel = require("../../../DB/model/user");
// const QRCode = require('qrcode');
// const sendEmail = require("../../../service/sendEmail");
var jwt = require("jsonwebtoken");


const getProfile = async (req,res) => {
   const userData = await userModel.findById(req.userid);
   
   res.json({message: "he5a", userData});
}

// const updateProfilePic = async (req,res) => {
//    console.log(req.files);
   
//    const user = await userModel.findById(req.userid)
//    if(user){
//       console.log(req.fileURL);
//       let imagesURL = []
//       for (let i = 0; i < req.files; i++) {
//          let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.files[i].filename}`;
//          imagesURL.push(imgURL);
//       }
//       let updatedUser = await userModel.findByIdAndUpdate(user._id, {profilePic: imagesURL}, {new: true});
//       console.log("done",updatedUser);
//       res.json(updatedUser);

//    }else{
//       res.status(404).json({message: "updatedUser not found."})
//    }
// };

// const updateCoverPic = async (req,res) => {
//    console.log(req.files);
   
//    const user = await userModel.findById(req.userid)
//    if(user){
//       console.log(req.fileURL);
//       let imagesURL = []
//       for (let i = 0; i < req.files; i++) {
//          let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.files[i].filename}`;
//          imagesURL.push(imgURL);
//       }
//       //let imgURL = req.fileURL + '/' + req.file.filename;
//       // let imgURL = `${req.protocol}://${req.headers.host}/${req.fileURL}/${req.file.filename}`;
//       let updatedUser = await userModel.findByIdAndUpdate(user._id, {coverPic: imagesURL}, {new: true});
//       console.log("done",updatedUser);
//       res.json(updatedUser);

//    }else{
//       res.status(404).json({message: "updatedUser not found."})
//    }
// };

// const QR = async(req,res) => {
//    const user = await userModel.findOne({_id: req.userid}).select("email firstName lastName Confirmed");
//    QRCode.toDataURL(`${req.protocol}://${req.headers.host}/user/${user._id}`,function (err, url){
//       if (err) {
//          res.json({message: "error", err})
//       }else{
//          res.json({message: "Okay", url})
//       }
//    })
// };

const updateEmail = async(req,res) => {

   const user = await userModel.findById(req.userid);
   
   const up = await userModel.findOne({email: req.body.email});
   if(up){
      if(user.email == up.email){
         res.status(400).json({message: "This is your old email."})
      }else{
      res.status(400).json({message: "Email already exists."})
      }
   }else if(!up && user.email != req.body.email){
      const user = await userModel.findByIdAndUpdate(req.userid, {email: req.body.email, /*Confirmed: false*/}, {new: true});
      res.json({message: "DONE.", user });
      var token = jwt.sign({ id: user._id }, process.env.verifyTokenKey);
      //  let URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirm/${token}`;
      //  await sendEmail(
      //    req.body.email,
      //    `<a href=${URL}>Please click here to confirm your email</a>`
      //  );
   }
   // res.json({user});
   console.log(user);
   
};

const deleteUser = async(req,res) => {

   const user = await userModel.findById(req.userid);
   const tobedel = await userModel.findOne({email: req.body.email});
   console.log(user);
   console.log(tobedel);
   if(user.role == "admin"){
      if(user.email == tobedel.email){
         console.log({message: "user is the account owner"});
         await userModel.findOneAndRemove({email: tobedel.email})
         res.json({message: "Removed"});
      }else if(tobedel.role == "user"){
         await userModel.findOneAndRemove({email: tobedel.email})
         res.json({message: "Removed"});
      }else if(tobedel.role == "admin"){
         res.status(401).json({message: "You can't remove another admin."});
      }
      console.log({message: "user is admin"});
      
   }else if(user.role == tobedel.role == "user" && user.email == tobedel.email){

      console.log({message: "user is the account owner"});
      await userModel.findOneAndRemove({email: tobedel.email})
      res.json({message: "Removed"});
   }else if(user.role == tobedel.role == "user" && user.email != tobedel.email){
      res.status(401).json({message: "You can't delete another user."})
   }else{
      res.status(400).json({message: "Invalid"})
   }
};

const softDelete = async(req,res) => {
   const user = await userModel.findById(req.userid);
   const tobedel = await userModel.findOne({email: req.body.email});
   console.log(user);
   console.log(tobedel);
   if(user.role != "admin"){
      res.status(401).json({message: "You're not authorized."});
   }else if(tobedel.role == "admin"){
      res.status(401).json({message: "You can't delete another admin."});
   }else{
      await userModel.findByIdAndUpdate(tobedel._id, {IsDeleted: true}, {new: true});
      res.json({message: "Deleted.", tobedel});
   }
};


module.exports = {
   getProfile,
   // updateProfilePic,
   // updateCoverPic,
   // QR,
   updateEmail,
   deleteUser,
   softDelete
};