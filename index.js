//import the express module
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const catagoryRouter = require("./routes/catagory");
const subcategoryRouter = require("./routes/sub_category");

//create the app
const app = express();

//mongodb string
const DB = "mongodb+srv://miasohan:Sohan708@my-cluster.r6j2kik.mongodb.net/?appName=my-cluster";

//middleware - to register or to mount the router
app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(catagoryRouter);
app.use(subcategoryRouter);
//connect to mongodb
mongoose.connect(DB).then(() => console.log("Connected to MongoDB"));

//define the port
const port = 3000;

//run the app
app.listen(port, "0.0.0.0", () => {
    //log the port
    console.log(`server running on port ${port}`)
})