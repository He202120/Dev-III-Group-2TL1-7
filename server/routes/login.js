const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 
require('dotenv').config();

router.use(cookieParser()); 

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`Tentative de connexion pour l'utilisateur avec l'email: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Utilisateur non trouvé");
      return res.status(422).json({ email: "Identifiants incorrects" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Mot de passe invalide");
      return res.status(422).json({ email: "Identifiants incorrects" });
    }

    console.log("Mot de passe valide");

    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWTSECRET, {
      expiresIn: "4h",
    });

    
    res.cookie('JWT_TOKEN', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 4 * 60 * 60 * 1000
    });

    console.log("Token et cookie envoyés");

    res.json({ success: true, token });
  } catch (err) {
    console.error("Erreur lors du processus de connexion:", err);
    res.status(500).json({ error: "Une erreur s'est produite lors de la connexion." });
  }
});

module.exports = router;
