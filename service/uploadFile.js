const multer = require ("multer");
const path = require("path");
const fs = require("fs");

const fileExtensions = {
   image: ["image/png", "image/jpeg", "image/gif", "image/jpg"],
   file: ["application/pdf"],
 };


const handleMulterErr = (err,req,res,next) => {
   if(err){
      res.status(400).json({message: "Too many files.", err})
   }else{
      next()
   }
}

function uploadData(customPath){
   if(!fs.existsSync(`uploads/${customPath}`)){
      fs.mkdirSync(`uploads/${customPath}`, {recursive: true});
   }
   const storage = multer.diskStorage({
      destination: function(req,res,cb){
         cb(null, `uploads/${customPath}`);
      },
      filename: function(req,file,cb){
         const uniqueSuffix = Date.now + "-" + file.originalname
         req.fileURL = `uploads/${customPath}`;
         cb(null, uniqueSuffix);
      },
   });
   const upload = multer({
      storage: storage,
      limits: {files: 3}
   });
   return upload
}

module.exports = {
   uploadData,
   handleMulterErr,
   fileExtensions
};