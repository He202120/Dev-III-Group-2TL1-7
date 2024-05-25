const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const JoueurModel = require('./models/Joueur')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://martin:73zeDP9DxC0qb1jq@clusterprojetdeviii.jj6kqfe.mongodb.net/Projet-football")

app.get('/getUsers', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getJoueurs', (req, res) => {
    JoueurModel.find()
    .then(joueurs => res.json(joueurs))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is running")
})