require("dotenv").config();
const express = require("express");
const connect = require("./DB/connection");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const allRoutes = require("./modules/index.router");
app.use(express.json());
let cors = require("cors");
app.use(cors());
// connect();
const uri = "mongodb+srv://fatmaahmed2272001:xv9qDWOVDyPlfx8d@fabrika.l5bkt0g.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 30000, 
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admins").command({ ping: 1 });
    await client.db('my-database');
  
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); 
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

const server=app.listen(port, () =>
  console.log("server is running on port " + port)
);
server.keepAliveTimeout = 65000;
