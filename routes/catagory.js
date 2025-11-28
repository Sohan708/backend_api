const express = require("express");
const Category = require("../models/category");
const catagoryRouter = express.Router();

catagoryRouter.post("/api/categories", async (req, res) => {
  try {
    const { name, image, banner } = req.body;
    const category = new Category({ name, image, banner });
    await category.save();
    res.status(201).json(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

catagoryRouter.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = catagoryRouter;