const { Router } = require('express');
const User = require('../models/user');
const Player = require("../models/player");
const bcrypt = require('bcryptjs');
const checkAuth = require('../middlewares/checkAuth');
const jwt = require("jsonwebtoken");
const isAdmin = require('../middlewares/isAdmin');
const router = new Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    res.json("Hello Vercel");
});

router.get('/logout', (req, res) => {
  res.clearCookie('JWT_TOKEN', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.clearCookie('token');

  res.redirect('/');
});

router.get('/users', checkAuth, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/users", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword, 
      description: req.body.description,
      dateOfBirth: req.body.dateOfBirth,
      role: req.body.role
    });
   
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
      dateOfBirth: newUser.dateOfBirth,
      description: newUser.description,
      role: newUser.role
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

router.post("/players", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newPlayer = await Player.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword, 
      dateOfBirth: req.body.dateOfBirth,
      description: req.body.description,
      role: req.body.role
    });

    res.status(201).json({
      _id: newPlayer._id,
      firstName: newPlayer.firstName,
      lastName: newPlayer.lastName,
      email: newPlayer.email,
      phone: newPlayer.phone,
      dateOfBirth: newPlayer.dateOfBirth,
      description: newPlayer.description,
      role: newPlayer.role
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

router.get('/users/:id', checkAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/users/:id', checkAuth, async (req, res, next) => {
  try {
    const { oldPassword, newPassword, ...rest } = req.body;
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.sendStatus(404);
    }

    if (oldPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(422).json({ message: "L'ancien mot de passe est incorrect." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Update user with other fields
    user = await User.findByIdAndUpdate(req.params.id, rest, { new: true });

    res.json(user);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});


router.delete('/users/:id', checkAuth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
