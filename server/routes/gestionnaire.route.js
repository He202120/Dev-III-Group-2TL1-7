const express = require("express");
const checkAuth = require('../middlewares/checkAuth');
const isAdmin = require('../middlewares/isAdmin');
const User = require('../models/user');
const router = express.Router();

//Controllers
const {getEvenement} = require('../controllers/agenda.controller.js');

router.get('/postulants', async (req, res) => {
    try {
      const usersWithRoleUser = await User.find({ role: 'user' });
      res.json(usersWithRoleUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
});

router.get('/players', async (req, res) => {
try {
    const usersWithRoleUser = await User.find({ role: 'player' });
    res.json(usersWithRoleUser);
} catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
}
});

router.delete('/postulants/:id', async (req, res, next) => {
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

router.patch('/postulant/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: 'player' }, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});


router.get('/Agenda', getEvenement);

module.exports = router;