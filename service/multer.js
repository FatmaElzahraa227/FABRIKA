
const multer = require ("multer");
const path = require ("path");
const fs = require ("fs");
// const nanoid = require("nanoid");
// import { nanoid } from 'nanoid'
// import { nanoid } from 'nanoid';

function multerFun(customDest) {
   // let customDest = "generalimages";
   
   // if (!fs.existsSync(path.join(__dirname, `../uploads/${customDest}`))) {
   //    fs.mkdirSync(path.join(__dirname, `../uploads/${customDest}`), { recursive: true });
   // }
   const storage = multer.diskStorage({
      destination: function (req,file,CB){
         console.log(req)
         if ( file.fieldname == "Images" ) {
            customDest = "generalimages";
            // req.destFile = `uploads/eventmedia/generalimages`;
         } else if ( file.fieldname == "numPlates" ) {
            customDest = "numplateimages";
            // req.destFile = `uploads/eventmedia/numplateimages`;
         } else if ( file.fieldname == "walkaround" ) {
            customDest = "walkaroundvideos";
            // req.destFile = `uploads/eventmedia/walkaroundvideos`;
         } else if ( file.fieldname == "VIN" ) {
            customDest = "VINpics";
            // req.destFile = `uploads/eventmedia/VINpics`;
         } else {
            res.json({ message: "Invalid field" });
         }

         req.destFile = `../uploads/eventmedia/${customDest}`;
         
         CB(null, path.join(__dirname, `../uploads/eventmedia/${customDest}`));
      },
      filename: function (req, file, CB){
         const fullName = Date.now() +'-'+ file.originalname;
         req.destFile = path.join(__dirname, `../uploads/eventmedia/${customDest}`);
         console.log(__dirname)
         CB(null, fullName);
      }
   });

   const fileFilter = function (req, file, CB) {
      console.log(req.file)
      if ( 
         file.fieldname == "Images" ||
         file.fieldname == "numPlates" ||
         file.fieldname == "VIN" ) {
         if( 
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg'  ||
            file.mimetype == 'image/png'  ){
            CB( null, true )
         } else {
            req.fileUploadError = true;
            CB(null, false);
         }
      } else if ( file.fieldname == "walkaround" ) {
         if( 
            file.mimetype == 'video/mp4' ||
            file.mimetype == 'video/mkv' ||
            file.mimetype == 'video/avi' ||
            file.mimetype == 'video/wmv' ||
            file.mimetype == 'video/amv' ||
            file.mimetype == 'video/webm'){
            CB( null, true )
         } else {
            req.fileUploadError = true;
            CB( null, false );
         }
      } else {
         res.json({ message: "Invalid field" })
      }
      req.destFile = `uploads/eventmedia/${customDest}`;
   }

   // const upload = multer({ destination: path.join(__dirname, `../uploads/eventmedia/${customDest}`), fileFilter, storage });
   // console.log(req);
   // return upload;
   return multer({ destination: path.join(__dirname, `../uploads/eventmedia/${customDest}`), fileFilter, /*storage:*/ storage });;
};

module.exports = {
   multerFun,
};
