const mongoose = require("mongoose");

const connect = async() => {
  await mongoose
    .connect(process.env.DB_CONNECTION)
    .then((res) => console.log("DB connected ..."))
    .catch((err) => console.log("Error connecting to DB", err));
    
};
// console.log(res);
 

module.exports = connect;