const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose
      .connect(process.env.DB_CONNECTION)
      .then((res) => console.log("DB connected ..."))
      .catch((err) => console.log("Error connecting to DB", err));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// console.log(res);

module.exports = connect;
