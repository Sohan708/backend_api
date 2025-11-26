const express = require("express");

const helloRouter = express.Router();

helloRouter.get("/hello", (req, res) => {
    res.send("Hello World!");
});

module.exports = helloRouter;
