//import the express module
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const catagoryRouter = require("./routes/catagory");
const subcategoryRouter = require("./routes/sub_category");
const productRouter = require("./routes/product");
const productReviewRouter = require("./routes/product_review");
const cors = require("cors");
//create the app
const app = express();

//mongodb string
const DB = "mongodb+srv://miasohan:Sohan708@my-cluster.r6j2kik.mongodb.net/?appName=my-cluster";

//middleware - to register or to mount the router
app.use(express.json());
app.use(cors());//enable cors for all routes and all origins(domain)
app.use(authRouter);
app.use(bannerRouter);
app.use(catagoryRouter);
app.use(subcategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);
//connect to mongodb
mongoose.connect(DB).then(() => console.log("Connected to MongoDB"));

//define the port
const port = 3000;

//run the app
app.listen(port, "0.0.0.0", () => {
    //log the port
    console.log(`server running on port ${port}`)
})