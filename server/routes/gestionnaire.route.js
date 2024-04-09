const express = require("express");

//Variable du router d'expresse
const router = express.Router();

//Controllers
<<<<<<< HEAD
const {getMembres, setMembres} = require('../controllers/gestionnaire.controller.js');
=======
const {getMembres, setMembres} = require('../controllers/gestionnaire.controller');
>>>>>>> 0b9b6cc961151372f5793e2b90aaf835079197bd

router.get('/gestionnaire', getMembres);

router.post('/gestionnaire/add', setMembres);

module.exports = router;