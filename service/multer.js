
const multer = require ("multer");
const path = require ("path");
const fs = require ("fs");
// const nanoid = require("nanoid");
// import { nanoid } from 'nanoid'
// import { nanoid } from 'nanoid';

function multerFun(customDest) {
   if (!fs.existsSync(path.join(__dirname, `../uploads/${customDest}`))) {
      fs.mkdirSync(path.join(__dirname, `../uploads/${customDest}`),{ recursive: true });
   }
   const storage = multer.diskStorage({
      destination: function (req,file,CB){
         
         req.destFile = `uploads/${customDest}`;
         
         CB(null, path.join(__dirname, `../uploads/${customDest}`));
      },
      filename: function (req, file,CB){
         const fullName = Date.now()+'-'+file.originalname;
         // req.destFile = path.join(__dirname, '../uploads/testfolder');
         // console.log(__dirname)
         CB(null, fullName);
      }
   })

   const fileFilter = function (req, file, CB) {
      if( file.mimetype == 'image/jpeg' ){
         CB( null, true )
      }else{
         req.fileUploadError = true;
         CB(null, false);
      }
   }

   const upload = multer({ destination: path.join(__dirname, `../uploads/${customDest}`), fileFilter, storage });
   // console.log(upload)
   return upload;
};

module.exports = {
   multerFun,
};
