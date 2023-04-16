const mongoose = require("mongoose");

const connect = async() => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB connected ...");
    return mongoose;
  } catch (err) {
    console.log("Error connecting to DB", err);
    throw err;
  } finally {
    await mongoose.disconnect();
  }
};

module.exports = connect;