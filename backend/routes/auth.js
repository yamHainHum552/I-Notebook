import mongoose from "mongoose";
import express from "express";
import user from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

const jwt_secret = "yam";

// Route:1, Creating a User using Post request, api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      // If errors, send bad req
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // check whether the user with an email exists already
      if (await user.findOne({ email: req.body.email })) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
        success = false;
      }
      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt);
      let { name, email, password, date } = req.body;
      password = secPass;

      // Creating a user
      const User = user
        .create({ name, email, password, date })
        .catch((err) => console.log(err.message));

      const data = req.body;
      success = true;

      const authToken = jwt.sign(data, jwt_secret);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      success = false;
    }
  }
);
// Route 2: Authenticate a user using post

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If errors, send bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      success = false;
    }

    const { email, password } = req.body;
    try {
      let login_user = await user.findOne({ email });
      if (!login_user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(
        password,
        login_user.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
        success = false;
      }
      const data = {
        user: {
          id: login_user._id,
        },
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
      success = false;
    }
  }
);
// Route 3: Get loggedin user details using post "/api/auth/getuser"

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const loggedin_user = await user.findById(userId).select("-password");
    res.send(loggedin_user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

export default router;
