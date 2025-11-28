const express = require("express");
const subcategoryRouter = express.Router();
const Subcategory = require("../models/sub_category");

subcategoryRouter.post("/api/subcategories", async (req, res) => {
    try {
        const { categoryId, categoryName, image, subCategoryName } = req.body;
        const subcategory = new Subcategory({ categoryId, categoryName, image, subCategoryName });
        await subcategory.save();
        res.status(201).send(subcategory);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

subcategoryRouter.get("/api/category/:categoryName/subcategories", async (req, res) => {
    try {
        //extract categoryName from the request url using destructuring
        const { categoryName } = req.params;
        const subcategories = await Subcategory.find({ categoryName: categoryName });
        //check if any subcategories are found
        if (!subcategories || subcategories.length === 0) {
            //if no subcategories are found, return a 404 error
            return res.status(404).json({ message: "No subcategories found" });
        } else {
            //if subcategories are found, return them
            res.status(200).json(subcategories);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = subcategoryRouter;
