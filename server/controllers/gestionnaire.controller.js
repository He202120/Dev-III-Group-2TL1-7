//Variable lié à la table de models des membres
<<<<<<< HEAD
const Membres = require("../models/membres.models.js");
=======
const Membres = require("../models/membres.models");
>>>>>>> 0b9b6cc961151372f5793e2b90aaf835079197bd

//Renvoie la liste des membres
const getMembres = async (req, res) => {

    try {
        const membreget = await Membres.find({});
        res.status(200).json(membreget)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const setMembres = async (req, res) => {

    try {
        const membrepost = await Membres.create(req.body);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getMembres,
    setMembres
};