
const multer = require("multer");
const path = require("path");
// const nanoid = require("nanoid");
// import { nanoid } from 'nanoid'
// import { nanoid } from 'nanoid';

function multerFun() {
   const storage = multer.diskStorage({
      destination: function (req,file,CB){
         console.log(file)
         req.destFile = path.join(__dirname, '../uploads/testfolder');
         
         CB(null, path.join(__dirname, '../uploads/testfolder'));
      },
      filename: function (req, file,CB){
         const fullName = Date.now()+'-'+file.originalname;
         // req.destFile = path.join(__dirname, '../uploads/testfolder');
         // console.log(__dirname)
         CB(null, fullName);
      }
   })

   const upload = multer({ destination: path.join(__dirname, '../uploads/testfolder'), storage });
   return upload;
};

module.exports = {
   multerFun,
};
