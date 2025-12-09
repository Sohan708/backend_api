const express = require("express");
const Vendor = require("../models/vendor");
const bcrypt = require("bcryptjs");

const vendorRouter = express.Router();

vendorRouter.post('/api/vendor/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingEmail = await Vendor.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ msg: "vendor with same email already exists" });
        } else {
            // Validate password length BEFORE hashing
            if (!password || password.length < 8) {
                return res.status(400).json({ msg: "Password must be at least 8 characters long" });
            } else {
                //Generate salt and hash password
                const salt = await bcrypt.genSalt(10);
                //hash the password using the generated salt
                const hashedPassword = await bcrypt.hash(password, salt);
                let vendor = new Vendor({ fullName, email, password: hashedPassword });
                await vendor.save();
                res.json({ vendor });
            }
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = vendorRouter;