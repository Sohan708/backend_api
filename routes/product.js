const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");

productRouter.post("/api/add-product", async (req, res) => {
    try {
        const { vendorId, fullName, productName, productPrice, quantity, description, category, subCategory, images } = req.body;
        const product = new Product({ vendorId, fullName, productName, productPrice, quantity, description, category, subCategory, images });
        await product.save();
        return res.status(201).send(product);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

productRouter.get("/api/popular-products", async (req, res) => {
    try {
        const product = await Product.find({ popular: true });
        if (!product || product.length === 0) {
            return res.status(404).json({ msg: "products notfound" });
        } else {
            return res.status(200).json(product);
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

productRouter.get("/api/recommended-products", async (req, res) => {
    try {
        const product = await Product.find({ recommend: true });
        if (!product || product.length === 0) {
            return res.status(404).json({ msg: "products notfound" });
        } else {
            return res.status(200).json(product);
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

//new route for retriving products by category
productRouter.get("/api/products-by-category/:category", async(req,res)=>{
    try {
        const {category} = req.params;
        const products = await Product.find({category, popular: true});
        if(!products  || products.length==0){
            return res.status(404).json({msg:"products not found"});
        }else{
            return res.status(200).json(products);
        }
    } catch (e) {
        return res.status(500).json({error:e.message});
    }
})

module.exports = productRouter;