const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ msg: "user with same email already exists" });
    }

    // Validate password length BEFORE hashing
    if (!password || password.length < 8) {
      return res.status(400).json({ msg: "Password must be at least 8 characters long" });
    }

    //Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    //hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    let user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Sign in route
authRouter.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(400).json({ msg: "User with this email does not exist" });
    } else {
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, findUser.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
      } else {
        // Generate a token
        const token = jwt.sign({ id: findUser._id }, "password-secret-key");
        //remove sensitive information
        const { password, ...userWithoutPassword } = findUser._doc;
        //send response
        res.json({ token, userWithoutPassword });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;