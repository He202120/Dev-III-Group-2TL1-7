const express = require("express");

//Variable du router d'expresse
const router = express.Router();

//Controllers
const {getEvenement, postEvent} = require('../controllers/agenda.controller.js');

router.get('/Agenda', getEvenement);
router.post('/Agenda/add', postEvent)

module.exports = router;