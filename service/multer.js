const { time } = require("console");
const multer = require("multer");
const path = require("path");
// const nanoid = require("nanoid");

function multerFun(){
   const storage = multer.diskStorage({
      dest: function (req,file,CB){
         req.destFile = path.join(__dirname, '../uploads/testfolder')
         CB(null, path.join(__dirname, '../uploads/testfolder'));
      },
      filename: function (req, file,CB){
         const fullName = time()+'-'+file.originalname;
         CB(null, fullName);
      }
   })

   const upload = multer({ dest: path.join(__dirname, '../uploads/testfolder'), storage});
   return upload;

}

module.exports = multerFun;
