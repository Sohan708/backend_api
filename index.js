//import the express module
const express = require("express");

const helloRouter = require("./routes/hello");
const mongoose = require("mongoose");

//create the app
const app = express();

//mongodb string
const DB = "mongodb+srv://miasohan:Sohan708@my-cluster.r6j2kik.mongodb.net/?appName=my-cluster";

//middleware - to register or to mount the router
app.use(helloRouter);

//connect to mongodb
mongoose.connect(DB).then(() => console.log("Connected to MongoDB"));

//define the port
const port = 3000;

//run the app
app.listen(port, "0.0.0.0", () => {
    //log the port
    console.log(`server running on port ${port}`)
})