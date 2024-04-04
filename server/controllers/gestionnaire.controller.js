//Variable lié à la table de models des membres
const Membres = require("../models/membres.models");

//Renvoie la liste des membres
const getMembres = async (req, res) => {

    try {
        const membreget = await Membres.find({});
        res.status(200).json(membreget)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const setMembres = async (req, res, next) => {

    try {
        const membrepost = await Membres.create({
            nom: req.nom,
            prenom: req.prenom,
            naissance: req.naissance,
            email: req.email,
            telephone: req.telephone,
            adresse: req.adresse,
            postal: req.postal,
            postejeu: req.postejeu,
            vma: req.vma,
            fitness: req.fitness,
            saut: req.saut,
            poste: req.poste,
            status: req.status
        });
        res.status(201).json({nom: req.nom,
            prenom: req.prenom,});
    } catch (error) {
        console.log("Une erreur est survenue.");
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getMembres,
    setMembres
};