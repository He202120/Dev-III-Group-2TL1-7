const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Debugging
    console.log("Received email:", email);
    console.log("Received password:", password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(422).json({ error: "Identifiants incorrects" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(422).json({ error: "Identifiants incorrects" });
    }

    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error in login route:", err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
});

module.exports = router;
