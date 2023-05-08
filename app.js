require("dotenv").config();
const express = require("express");
const client = require("./DB/connection");
const app = express();
const allRoutes = require("./modules/index.router");
app.use(express.json());
let cors = require("cors");
app.use(cors());
client();
const vehicleModel = require("./DB/model/vehicle");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//  var bodyParser = require('body-parser')
//  app.use(bodyParser.urlencoded({ extended: false }))
//  app.use(bodyParser.json())

//  // Set EJS as templating engine
//  app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1/auth", allRoutes.authRouter);
app.use("/api/v1/user", allRoutes.userRouter);
app.use("/api/v1/vehicle", allRoutes.vehicleRouter);
app.use("/api/v1/admin", allRoutes.adminRouter);
const port = process.env.PORT;

app.listen(port, "0.0.0.0", () =>
  console.log("server is running on port " + port)
);
